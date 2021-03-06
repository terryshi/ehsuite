/*    */ package com.htsoft.oa.service.document.impl;
/*    */ 
/*    */ import com.htsoft.core.service.impl.BaseServiceImpl;
/*    */ import com.htsoft.core.web.paging.PagingBean;
/*    */ import com.htsoft.oa.dao.document.DocPrivilegeDao;
/*    */ import com.htsoft.oa.model.document.DocPrivilege;
/*    */ import com.htsoft.oa.model.system.AppUser;
/*    */ import com.htsoft.oa.service.document.DocPrivilegeService;
/*    */ import java.util.List;
/*    */ 
/*    */ public class DocPrivilegeServiceImpl extends BaseServiceImpl<DocPrivilege>
/*    */   implements DocPrivilegeService
/*    */ {
/*    */   private DocPrivilegeDao dao;
/*    */ 
/*    */   public DocPrivilegeServiceImpl(DocPrivilegeDao dao)
/*    */   {
/* 19 */     super(dao);
/* 20 */     this.dao = dao;
/*    */   }
/*    */ 
/*    */   public List<DocPrivilege> getAll(DocPrivilege docPrivilege, Long folderId, PagingBean pb)
/*    */   {
/* 26 */     return this.dao.getAll(docPrivilege, folderId, pb);
/*    */   }
/*    */ 
/*    */   public List<Integer> getRightsByFolder(AppUser user, Long folderId)
/*    */   {
/* 31 */     return this.dao.getRightsByFolder(user, folderId);
/*    */   }
/*    */ 
/*    */   public Integer getRightsByDocument(AppUser user, Long docId)
/*    */   {
/* 36 */     return this.dao.getRightsByDocument(user, docId);
/*    */   }
/*    */ }

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.service.document.impl.DocPrivilegeServiceImpl
 * JD-Core Version:    0.6.0
 */