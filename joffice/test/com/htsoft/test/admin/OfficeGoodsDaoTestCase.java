/*    */ package com.htsoft.test.admin;
/*    */ 
/*    */ import com.htsoft.oa.dao.admin.OfficeGoodsDao;
/*    */ import com.htsoft.test.BaseTestCase;
/*    */ import java.io.PrintStream;
/*    */ import java.text.SimpleDateFormat;
/*    */ import java.util.Date;
/*    */ import javax.annotation.Resource;
/*    */ import org.junit.Test;
/*    */ 
/*    */ public class OfficeGoodsDaoTestCase extends BaseTestCase
/*    */ {
/*    */ 
/*    */   @Resource
/*    */   private OfficeGoodsDao officeGoodsDao;
/*    */ 
/*    */   @Test
/*    */   public void test1()
/*    */   {
/* 29 */     Date date = new Date();
/* 30 */     SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssS");
/* 31 */     System.out.print(sdf.format(date));
/*    */   }
/*    */ }

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.test.admin.OfficeGoodsDaoTestCase
 * JD-Core Version:    0.6.0
 */