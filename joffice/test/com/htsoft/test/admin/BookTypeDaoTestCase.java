/*    */ package com.htsoft.test.admin;
/*    */ 
/*    */ import com.htsoft.oa.dao.admin.BookTypeDao;
/*    */ import com.htsoft.oa.model.admin.BookType;
/*    */ import com.htsoft.test.BaseTestCase;
/*    */ import javax.annotation.Resource;
/*    */ import org.junit.Test;
/*    */ import org.springframework.test.annotation.Rollback;
/*    */ 
/*    */ public class BookTypeDaoTestCase extends BaseTestCase
/*    */ {
/*    */ 
/*    */   @Resource
/*    */   private BookTypeDao bookTypeDao;
/*    */ 
/*    */   @Test
/*    */   @Rollback(false)
/*    */   public void add()
/*    */   {
/* 19 */     BookType bookType = new BookType();
/*    */ 
/* 22 */     this.bookTypeDao.save(bookType);
/*    */   }
/*    */ }

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.test.admin.BookTypeDaoTestCase
 * JD-Core Version:    0.6.0
 */