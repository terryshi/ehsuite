/*    */ package com.htsoft.oa.service.archive.impl;
/*    */ 
/*    */ import com.htsoft.core.service.impl.BaseServiceImpl;
/*    */ import com.htsoft.oa.dao.archive.ArchivesDocDao;
/*    */ import com.htsoft.oa.model.archive.ArchivesDoc;
/*    */ import com.htsoft.oa.service.archive.ArchivesDocService;
/*    */ import java.util.List;
/*    */ 
/*    */ public class ArchivesDocServiceImpl extends BaseServiceImpl<ArchivesDoc>
/*    */   implements ArchivesDocService
/*    */ {
/*    */   private ArchivesDocDao dao;
/*    */ 
/*    */   public ArchivesDocServiceImpl(ArchivesDocDao dao)
/*    */   {
/* 16 */     super(dao);
/* 17 */     this.dao = dao;
/*    */   }
/*    */ 
/*    */   public List<ArchivesDoc> findByAid(Long archivesId)
/*    */   {
/* 22 */     return this.dao.findByAid(archivesId);
/*    */   }
/*    */ }

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.service.archive.impl.ArchivesDocServiceImpl
 * JD-Core Version:    0.6.0
 */