/*    */ package com.htsoft.test.hrm;
/*    */ 
/*    */ import com.htsoft.oa.dao.hrm.SalaryItemDao;
/*    */ import com.htsoft.oa.model.hrm.SalaryItem;
/*    */ import com.htsoft.test.BaseTestCase;
/*    */ import javax.annotation.Resource;
/*    */ import org.junit.Test;
/*    */ import org.springframework.test.annotation.Rollback;
/*    */ 
/*    */ public class SalaryItemDaoTestCase extends BaseTestCase
/*    */ {
/*    */ 
/*    */   @Resource
/*    */   private SalaryItemDao salaryItemDao;
/*    */ 
/*    */   @Test
/*    */   @Rollback(false)
/*    */   public void add()
/*    */   {
/* 19 */     SalaryItem salaryItem = new SalaryItem();
/*    */ 
/* 22 */     this.salaryItemDao.save(salaryItem);
/*    */   }
/*    */ }

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.test.hrm.SalaryItemDaoTestCase
 * JD-Core Version:    0.6.0
 */