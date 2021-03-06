/*    */ package com.htsoft.oa.dao.task.impl;
/*    */ 
/*    */ import com.htsoft.core.dao.impl.BaseDaoImpl;
/*    */ import com.htsoft.oa.dao.task.PlanAttendDao;
/*    */ import com.htsoft.oa.model.task.PlanAttend;
/*    */ import java.util.ArrayList;
/*    */ import java.util.List;
/*    */ 
/*    */ public class PlanAttendDaoImpl extends BaseDaoImpl<PlanAttend>
/*    */   implements PlanAttendDao
/*    */ {
/*    */   public PlanAttendDaoImpl()
/*    */   {
/* 16 */     super(PlanAttend.class);
/*    */   }
/*    */ 
/*    */   public List<PlanAttend> FindPlanAttend(Long planId, Short isDep, Short isPrimary)
/*    */   {
/* 21 */     StringBuffer hql = new StringBuffer("from PlanAttend vo where vo.workPlan.planId=?");
/* 22 */     ArrayList list = new ArrayList();
/* 23 */     list.add(planId);
/* 24 */     if (isDep != null) {
/* 25 */       hql.append(" and vo.isDep=?");
/* 26 */       list.add(isDep);
/*    */     }
/* 28 */     if (isPrimary != null) {
/* 29 */       hql.append(" and vo.isPrimary=?");
/* 30 */       list.add(isPrimary);
/*    */     }
/* 32 */     return findByHql(hql.toString(), list.toArray());
/*    */   }
/*    */ }

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.dao.task.impl.PlanAttendDaoImpl
 * JD-Core Version:    0.6.0
 */