/*    */ package com.htsoft.test.system;
/*    */ 
/*    */ import com.htsoft.oa.dao.system.FunUrlDao;
/*    */ import com.htsoft.oa.model.system.FunUrl;
/*    */ import com.htsoft.test.BaseTestCase;
/*    */ import javax.annotation.Resource;
/*    */ import org.junit.Test;
/*    */ import org.springframework.test.annotation.Rollback;
/*    */ 
/*    */ public class FunUrlDaoTestCase extends BaseTestCase
/*    */ {
/*    */ 
/*    */   @Resource
/*    */   private FunUrlDao funUrlDao;
/*    */ 
/*    */   @Test
/*    */   @Rollback(false)
/*    */   public void add()
/*    */   {
/* 19 */     FunUrl funUrl = new FunUrl();
/*    */ 
/* 22 */     this.funUrlDao.save(funUrl);
/*    */   }
/*    */ }

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.test.system.FunUrlDaoTestCase
 * JD-Core Version:    0.6.0
 */