package com.htsoft.oa.service.archive;

import com.htsoft.core.service.BaseService;
import com.htsoft.oa.model.archive.ArchHasten;
import java.util.Date;

public abstract interface ArchHastenService extends BaseService<ArchHasten>
{
  public abstract Date getLeastRecordByUser(Long paramLong);
}

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.service.archive.ArchHastenService
 * JD-Core Version:    0.6.0
 */