/*    */ package com.htsoft.oa.dao.personal.impl;
/*    */ 
/*    */ import com.htsoft.core.dao.impl.BaseDaoImpl;
/*    */ import com.htsoft.oa.dao.personal.DutyDao;
/*    */ import com.htsoft.oa.model.personal.Duty;
/*    */ import java.util.Date;
/*    */ import java.util.List;
/*    */ 
/*    */ public class DutyDaoImpl extends BaseDaoImpl<Duty>
/*    */   implements DutyDao
/*    */ {
/*    */   public DutyDaoImpl()
/*    */   {
/* 16 */     super(Duty.class);
/*    */   }
/*    */ 
/*    */   public List<Duty> getUserDutyByTime(Long userId, Date startTime, Date endTime)
/*    */   {
/* 27 */     String hql = "from Duty dy where dy.appUser.userId=? and ((dy.startTime<=? and dy.endTime>=?) or (dy.startTime<=? and dy.endTime>=?))";
/* 28 */     return findByHql(hql, new Object[] { userId, startTime, startTime, endTime, endTime });
/*    */   }
/*    */ 
/*    */   public List<Duty> getCurUserDuty(Long userId)
/*    */   {
/* 36 */     String hql = "from Duty dy where dy.appUser.userId=? and dy.startTime<=? and dy.endTime>=?";
/* 37 */     Date curDate = new Date();
/* 38 */     return findByHql(hql, new Object[] { userId, curDate, curDate });
/*    */   }
/*    */ }

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.dao.personal.impl.DutyDaoImpl
 * JD-Core Version:    0.6.0
 */