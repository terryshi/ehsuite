/*    */ package com.htsoft.test.document;
/*    */ 
/*    */ import com.htsoft.oa.dao.document.DocFolderDao;
/*    */ import com.htsoft.oa.dao.system.AppUserDao;
/*    */ import com.htsoft.test.BaseTestCase;
/*    */ import java.io.PrintStream;
/*    */ import java.util.regex.Matcher;
/*    */ import java.util.regex.Pattern;
/*    */ import javax.annotation.Resource;
/*    */ import org.junit.Test;
/*    */ 
/*    */ public class DocFolderDaoTestCase extends BaseTestCase
/*    */ {
/*    */ 
/*    */   @Resource
/*    */   private DocFolderDao docFolderDao;
/*    */ 
/*    */   @Resource
/*    */   private AppUserDao appUserDao;
/*    */ 
/*    */   @Test
/*    */   public void move()
/*    */   {
/* 52 */     String st = "1.2.3.6.5.";
/* 53 */     boolean ss = Pattern.compile("1.3").matcher(st).find();
/* 54 */     System.out.println(ss);
/*    */   }
/*    */ }

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.test.document.DocFolderDaoTestCase
 * JD-Core Version:    0.6.0
 */