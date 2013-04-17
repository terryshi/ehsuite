 package com.htsoft.core.DataInit;
 
 import com.htsoft.core.model.BaseModel;
 import com.htsoft.core.service.BaseService;
 import com.htsoft.core.util.AppUtil;
 import com.htsoft.core.util.XmlUtil;
 import java.beans.BeanInfo;
 import java.beans.IntrospectionException;
 import java.beans.Introspector;
 import java.beans.PropertyDescriptor;
 import java.lang.reflect.InvocationTargetException;
 import java.lang.reflect.Method;
 import java.text.ParseException;
 import java.text.SimpleDateFormat;
 import java.util.Date;
 import java.util.HashMap;
 import java.util.Iterator;
 import java.util.List;
 import java.util.Map;
 import org.apache.commons.beanutils.ConvertUtils;
 import org.apache.commons.logging.Log;
 import org.apache.commons.logging.LogFactory;
 import org.dom4j.Document;
 import org.dom4j.Element;
 
 public class DataInit
 {
   private static Log logger = LogFactory.getLog(DataInit.class);
   private static SimpleDateFormat df = new SimpleDateFormat(
     "yyyy-mm-dd");
 
   public static void init(String absPath)
   {
     String confPath = absPath + "/WEB-INF/classes/conf";
     String dataInitFile = confPath + "/data-init.xml";
     Document rootDoc = XmlUtil.load(dataInitFile);
     if (rootDoc != null) {
       Element rootEl = rootDoc.getRootElement();
       initNode(rootEl, null);
     }
   }
 
   public static void initNode(Element rootEl, Object parentObj)
   {
     if (rootEl != null) {
       Iterator model_It = rootEl.elementIterator();
       while (model_It.hasNext()) {
         Element modelEl = (Element)model_It.next();
 
         String _class = modelEl.attributeValue("class");
         String _service = modelEl.attributeValue("service");
         String _description = modelEl.attributeValue("description");
 
         if (_description != null) {
           logger.info(_description);
         }
         List propertyList = modelEl.selectNodes("property");
         Iterator modelIt = propertyList.iterator();
 
         List setList = modelEl.selectNodes("set");
         Iterator setIt = setList.iterator();
         try {
           BaseModel model = 
             (BaseModel)Class.forName(_class).newInstance();
           BaseService service = (BaseService)
             AppUtil.getBean(_service);
 
           Map nodeMap = convertNodeToMap(modelIt, 
             parentObj);
 
           model = (BaseModel)convertMapToBean(Class.forName(_class), 
             nodeMap);
           model = (BaseModel)service.save(model);
           service.flush();
 
           String primary_key = modelEl.attributeValue("primary-key");
           String key_type = modelEl.attributeValue("key-type");
           Map beanMap = convertBeanToMap(model);
           Object key_value = beanMap.get(primary_key);
           while (setIt.hasNext()) {
             Element setEl = (Element)setIt.next();
             initNode(setEl, key_value);
           }
         }
         catch (Exception e) {
           e.printStackTrace();
         }
       }
     }
   }
 
   private static Map<Object, Object> convertNodeToMap(Iterator<Element> modelIt, Object parentObj)
   {
     Map beanMap = new HashMap();
     if (modelIt != null)
     {
       while (modelIt.hasNext()) {
         Element propertyEl = (Element)modelIt.next();
         String name = propertyEl.attributeValue("name");
         String value = propertyEl.attributeValue("value");
         String foreign_key = propertyEl.attributeValue("foreign-key");
         String today_value = propertyEl.attributeValue("today-value");
 
         String date_format = propertyEl.attributeValue("date-format");
         if (date_format != null) {
           df.applyPattern(date_format);
         }
         Object valueObj = null;
         if ((foreign_key != null) && (foreign_key.equals("true")))
           valueObj = parentObj;
         else if ((today_value != null) && (today_value.equals("true")))
           valueObj = df.format(new Date());
         else {
           valueObj = value;
         }
 
         beanMap.put(name, valueObj);
       }
     }
 
     return beanMap;
   }
 
   private static <T> Map<Object, Object> convertBeanToMap(Object bean)
     throws IntrospectionException
   {
     Class type = bean.getClass();
     Map returnMap = new HashMap();
     BeanInfo beanInfo = Introspector.getBeanInfo(type);
 
     PropertyDescriptor[] propertyDescriptors = beanInfo
       .getPropertyDescriptors();
     for (int i = 0; i < propertyDescriptors.length; i++) {
       PropertyDescriptor descriptor = propertyDescriptors[i];
       String propertyName = descriptor.getName();
       if (!propertyName.equals("class")) {
         Method readMethod = descriptor.getReadMethod();
         try
         {
           Object result = readMethod.invoke(bean, new Object[0]);
           returnMap.put(propertyName, result);
         }
         catch (Exception e) {
           logger.debug("解析方法名:" + readMethod + ",有误!");
         }
       }
 
     }
 
     return returnMap;
   }
 
   private static <T> T convertMapToBean(Class<T> type, Map<Object, Object> map)
     throws IntrospectionException, InstantiationException, IllegalAccessException
   {
     BeanInfo beanInfo = Introspector.getBeanInfo(type);
     Object t = type.newInstance();
 
     for (PropertyDescriptor descriptor : beanInfo.getPropertyDescriptors()) {
       String propertyName = descriptor.getName();
       if (!map.containsKey(propertyName))
         continue;
       String value = ConvertUtils.convert(map.get(propertyName));
       Object[] args = new Object[1];
       try
       {
         args[0] = df.parse(value);
       } catch (ParseException e) {
         args[0] = ConvertUtils.convert(value, 
           descriptor.getPropertyType());
       }
       try
       {
         descriptor.getWriteMethod().invoke(t, args);
       }
       catch (IllegalArgumentException e) {
         e.printStackTrace();
       }
       catch (InvocationTargetException e) {
         e.printStackTrace();
       }
 
     }
 
     return (T) t;
   }
 }

