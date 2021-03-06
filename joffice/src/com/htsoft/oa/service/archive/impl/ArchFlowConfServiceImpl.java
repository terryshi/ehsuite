/*    */ package com.htsoft.oa.service.archive.impl;
/*    */ 
/*    */ import com.htsoft.core.service.impl.BaseServiceImpl;
/*    */ import com.htsoft.oa.dao.archive.ArchFlowConfDao;
/*    */ import com.htsoft.oa.model.archive.ArchFlowConf;
/*    */ import com.htsoft.oa.service.archive.ArchFlowConfService;
/*    */ 
/*    */ public class ArchFlowConfServiceImpl extends BaseServiceImpl<ArchFlowConf>
/*    */   implements ArchFlowConfService
/*    */ {
/*    */   private ArchFlowConfDao dao;
/*    */ 
/*    */   public ArchFlowConfServiceImpl(ArchFlowConfDao dao)
/*    */   {
/* 15 */     super(dao);
/* 16 */     this.dao = dao;
/*    */   }
/*    */ 
/*    */   public ArchFlowConf getByFlowType(Short archType)
/*    */   {
/* 21 */     return this.dao.getByFlowType(archType);
/*    */   }
/*    */ 
/*    */   public Long getDefId(Short archType)
/*    */   {
/* 26 */     ArchFlowConf ac = getByFlowType(archType);
/* 27 */     if (ac != null) {
/* 28 */       return ac.getDefId();
/*    */     }
/* 30 */     return null;
/*    */   }
/*    */ }

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.service.archive.impl.ArchFlowConfServiceImpl
 * JD-Core Version:    0.6.0
 */