/*    */ package com.htsoft.oa.service.hrm.impl;
/*    */ 
/*    */ import com.htsoft.core.service.impl.BaseServiceImpl;
/*    */ import com.htsoft.oa.dao.hrm.SalaryPayoffDao;
/*    */ import com.htsoft.oa.model.hrm.SalaryPayoff;
/*    */ import com.htsoft.oa.service.hrm.SalaryPayoffService;
/*    */ 
/*    */ public class SalaryPayoffServiceImpl extends BaseServiceImpl<SalaryPayoff>
/*    */   implements SalaryPayoffService
/*    */ {
/*    */   private SalaryPayoffDao dao;
/*    */ 
/*    */   public SalaryPayoffServiceImpl(SalaryPayoffDao dao)
/*    */   {
/* 15 */     super(dao);
/* 16 */     this.dao = dao;
/*    */   }
/*    */ }

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.service.hrm.impl.SalaryPayoffServiceImpl
 * JD-Core Version:    0.6.0
 */