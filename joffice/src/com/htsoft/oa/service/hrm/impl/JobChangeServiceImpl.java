/*    */ package com.htsoft.oa.service.hrm.impl;
/*    */ 
/*    */ import com.htsoft.core.service.impl.BaseServiceImpl;
/*    */ import com.htsoft.oa.dao.hrm.JobChangeDao;
/*    */ import com.htsoft.oa.model.hrm.JobChange;
/*    */ import com.htsoft.oa.service.hrm.JobChangeService;
/*    */ 
/*    */ public class JobChangeServiceImpl extends BaseServiceImpl<JobChange>
/*    */   implements JobChangeService
/*    */ {
/*    */   private JobChangeDao dao;
/*    */ 
/*    */   public JobChangeServiceImpl(JobChangeDao dao)
/*    */   {
/* 15 */     super(dao);
/* 16 */     this.dao = dao;
/*    */   }
/*    */ }

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.service.hrm.impl.JobChangeServiceImpl
 * JD-Core Version:    0.6.0
 */