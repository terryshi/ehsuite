/*    */ package com.htsoft.oa.dao.system.impl;
/*    */ 
/*    */ import com.htsoft.core.dao.impl.BaseDaoImpl;
/*    */ import com.htsoft.oa.dao.system.AppFunctionDao;
/*    */ import com.htsoft.oa.model.system.AppFunction;
/*    */ 
/*    */ public class AppFunctionDaoImpl extends BaseDaoImpl<AppFunction>
/*    */   implements AppFunctionDao
/*    */ {
/*    */   public AppFunctionDaoImpl()
/*    */   {
/* 13 */     super(AppFunction.class);
/*    */   }
/*    */ 
/*    */   public AppFunction getByKey(String key)
/*    */   {
/* 21 */     String hql = "from AppFunction af where af.funKey=?";
/* 22 */     return (AppFunction)findUnique(hql, new String[] { key });
/*    */   }
/*    */ }

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.dao.system.impl.AppFunctionDaoImpl
 * JD-Core Version:    0.6.0
 */