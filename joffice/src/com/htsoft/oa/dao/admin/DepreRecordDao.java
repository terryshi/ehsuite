package com.htsoft.oa.dao.admin;

import com.htsoft.core.dao.BaseDao;
import com.htsoft.oa.model.admin.DepreRecord;
import java.util.Date;

public abstract interface DepreRecordDao extends BaseDao<DepreRecord>
{
  public abstract Date findMaxDate(Long paramLong);
}

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.dao.admin.DepreRecordDao
 * JD-Core Version:    0.6.0
 */