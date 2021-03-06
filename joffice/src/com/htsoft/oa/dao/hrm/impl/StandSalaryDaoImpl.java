/*    */ package com.htsoft.oa.dao.hrm.impl;
/*    */ 
/*    */ import com.htsoft.core.Constants;
/*    */ import com.htsoft.core.dao.impl.BaseDaoImpl;
/*    */ import com.htsoft.oa.dao.hrm.StandSalaryDao;
/*    */ import com.htsoft.oa.model.hrm.StandSalary;
/*    */ import java.sql.SQLException;
/*    */ import java.util.List;
/*    */ import org.hibernate.HibernateException;
/*    */ import org.hibernate.Query;
/*    */ import org.hibernate.Session;
/*    */ import org.springframework.orm.hibernate3.HibernateCallback;
/*    */ import org.springframework.orm.hibernate3.HibernateTemplate;
/*    */ 
/*    */ public class StandSalaryDaoImpl extends BaseDaoImpl<StandSalary>
/*    */   implements StandSalaryDao
/*    */ {
/*    */   public StandSalaryDaoImpl()
/*    */   {
/* 22 */     super(StandSalary.class);
/*    */   }
/*    */ 
/*    */   public boolean checkStandNo(final String standardNo)
/*    */   {
/* 27 */     String hql = "select count(*) from StandSalary ss where ss.standardNo = ?";
/* 28 */     Long count = (Long)getHibernateTemplate().execute(new HibernateCallback()
/*    */     {
/*    */       public Object doInHibernate(Session session) throws HibernateException, SQLException
/*    */       {
/* 32 */         Query query = session.createQuery("select count(*) from StandSalary ss where ss.standardNo = ?");
/* 33 */         query.setString(0, standardNo);
/* 34 */         return query.uniqueResult();
/*    */       }
/*    */     });
/* 37 */     return count.longValue() == 0L;
/*    */   }
/*    */ 
/*    */   public List<StandSalary> findByPassCheck()
/*    */   {
/* 45 */     String hql = "from StandSalary vo where vo.status=?";
/* 46 */     Object[] objs = { Constants.FLAG_PASS };
/* 47 */     return findByHql(hql, objs);
/*    */   }
/*    */ }

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.dao.hrm.impl.StandSalaryDaoImpl
 * JD-Core Version:    0.6.0
 */