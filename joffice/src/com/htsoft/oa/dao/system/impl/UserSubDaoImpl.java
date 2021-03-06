/*    */ package com.htsoft.oa.dao.system.impl;
/*    */ 
/*    */ import com.htsoft.core.dao.impl.BaseDaoImpl;
/*    */ import com.htsoft.oa.dao.system.UserSubDao;
/*    */ import com.htsoft.oa.model.system.AppUser;
/*    */ import com.htsoft.oa.model.system.UserSub;
/*    */ import java.util.ArrayList;
/*    */ import java.util.List;
/*    */ 
/*    */ public class UserSubDaoImpl extends BaseDaoImpl<UserSub>
/*    */   implements UserSubDao
/*    */ {
/*    */   public UserSubDaoImpl()
/*    */   {
/* 16 */     super(UserSub.class);
/*    */   }
/*    */ 
/*    */   public List<Long> upUser(Long userId)
/*    */   {
/* 21 */     String hql = "from UserSub vo where vo.subAppUser.userId=?";
/* 22 */     Object[] objs = { userId };
/* 23 */     List<UserSub> list = findByHql(hql, objs);
/* 24 */     List idList = new ArrayList();
/* 25 */     for (UserSub sb : list) {
/* 26 */       idList.add(sb.getUserId());
/*    */     }
/* 28 */     return idList;
/*    */   }
/*    */ 
/*    */   public List<Long> subUsers(Long userId)
/*    */   {
/* 33 */     String hql = "from UserSub vo where vo.userId=?";
/* 34 */     Object[] objs = { userId };
/* 35 */     List<UserSub> list = findByHql(hql, objs);
/* 36 */     List idList = new ArrayList();
/* 37 */     for (UserSub sb : list) {
/* 38 */       idList.add(sb.getSubAppUser().getUserId());
/*    */     }
/* 40 */     return idList;
/*    */   }
/*    */ }

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.dao.system.impl.UserSubDaoImpl
 * JD-Core Version:    0.6.0
 */