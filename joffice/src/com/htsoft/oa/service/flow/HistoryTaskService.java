package com.htsoft.oa.service.flow;

import com.htsoft.core.service.BaseService;
import java.util.List;
import org.jbpm.pvm.internal.history.model.HistoryTaskInstanceImpl;

public abstract interface HistoryTaskService extends BaseService<HistoryTaskInstanceImpl>
{
  public abstract List<HistoryTaskInstanceImpl> getByPiIdAssigneeOutcome(String paramString1, String paramString2, String paramString3, String paramString4);
}

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.service.flow.HistoryTaskService
 * JD-Core Version:    0.6.0
 */