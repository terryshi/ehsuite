 package com.htsoft.oa.action.archive;
 
 import com.google.gson.Gson;
 import com.htsoft.core.command.QueryFilter;
 import com.htsoft.core.util.ContextUtil;
 import com.htsoft.core.util.JsonUtil;
 import com.htsoft.core.web.action.BaseAction;
 import com.htsoft.core.web.paging.PagingBean;
 import com.htsoft.oa.model.archive.ArchDispatch;
 import com.htsoft.oa.model.archive.Archives;
 import com.htsoft.oa.model.archive.ArchivesDep;
 import com.htsoft.oa.model.system.AppRole;
 import com.htsoft.oa.model.system.AppUser;
 import com.htsoft.oa.service.archive.ArchDispatchService;
 import com.htsoft.oa.service.archive.ArchivesDepService;
 import com.htsoft.oa.service.archive.ArchivesService;
 import com.htsoft.oa.service.flow.JbpmService;
 import com.htsoft.oa.service.system.AppRoleService;
 import com.htsoft.oa.service.system.AppUserService;
 import flexjson.JSONSerializer;
 import java.util.Date;
 import java.util.List;
 import java.util.Set;
 import javax.annotation.Resource;
 import javax.servlet.http.HttpServletRequest;
 import org.apache.commons.lang.StringUtils;
 import org.jbpm.api.TaskService;
 import org.jbpm.pvm.internal.task.TaskImpl;
 
 public class ArchDispatchAction extends BaseAction
 {
 
   @Resource
   private ArchDispatchService archDispatchService;
   private ArchDispatch archDispatch;
 
   @Resource
   private ArchivesService archivesService;
 
   @Resource
   private AppUserService appUserService;
 
   @Resource
   private AppRoleService appRoleService;
 
   @Resource
   private ArchivesDepService archivesDepService;
 
   @Resource
   private JbpmService jbpmService;
 
   @Resource
   private TaskService taskService;
   private Long dispatchId;
   private Long archivesId;
   private Short archUserType;
   private String readFeedback;
   private String taskName;
   private String taskId;
 
   public String getTaskName()
   {
     return this.taskName;
   }
 
   public void setTaskName(String taskName) {
     this.taskName = taskName;
   }
 
   public Short getArchUserType() {
     return this.archUserType;
   }
 
   public void setArchUserType(Short archUserType) {
     this.archUserType = archUserType;
   }
 
   public String getReadFeedback() {
     return this.readFeedback;
   }
 
   public void setReadFeedback(String readFeedback) {
     this.readFeedback = readFeedback;
   }
 
   public Long getArchivesId() {
     return this.archivesId;
   }
 
   public void setArchivesId(Long archivesId) {
     this.archivesId = archivesId;
   }
 
   public Long getDispatchId() {
     return this.dispatchId;
   }
 
   public void setDispatchId(Long dispatchId) {
     this.dispatchId = dispatchId;
   }
 
   public ArchDispatch getArchDispatch() {
     return this.archDispatch;
   }
 
   public void setArchDispatch(ArchDispatch archDispatch) {
     this.archDispatch = archDispatch;
   }
 
   public String getTaskId() {
     return this.taskId;
   }
 
   public void setTaskId(String taskId) {
     this.taskId = taskId;
   }
 
   public String list()
   {
     QueryFilter filter = new QueryFilter(getRequest());
     filter.addFilter("Q_userId_L_EQ", ContextUtil.getCurrentUserId()
       .toString());
     List list = this.archDispatchService.getAll(filter);
 
     StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
       .append(filter.getPagingBean().getTotalItems()).append(
       ",result:");
 
     JSONSerializer serializer = JsonUtil.getJSONSerializer(new String[] { "dispatchTime", "archives.issueDate", "archives.createtime" });
     buff.append(serializer.exclude(new String[] { "class" })
       .serialize(list));
     buff.append("}");
 
     this.jsonString = buff.toString();
 
     return "success";
   }
 
   public String disList()
   {
     PagingBean pb = getInitPagingBean();
     List list = this.archDispatchService.findByUser(
       ContextUtil.getCurrentUser(), pb);
     StringBuffer buff = new StringBuffer("{success:true,'totalCounts':")
       .append(pb.getTotalItems()).append(",result:");
 
     JSONSerializer serializer = JsonUtil.getJSONSerializer(new String[] { "dispatchTime" });
     buff.append(serializer.exclude(new String[] { "class" })
       .serialize(list));
     buff.append("}");
 
     this.jsonString = buff.toString();
     return "success";
   }
 
   public String multiDel()
   {
     String[] ids = getRequest().getParameterValues("ids");
     if (ids != null) {
       for (String id : ids) {
         this.archDispatchService.remove(new Long(id));
       }
     }
 
     this.jsonString = "{success:true}";
 
     return "success";
   }
 
   public String get()
   {
     ArchDispatch archDispatch = (ArchDispatch)this.archDispatchService.get(this.dispatchId);
 
     Gson gson = new Gson();
 
     StringBuffer sb = new StringBuffer("{success:true,data:");
     sb.append(gson.toJson(archDispatch));
     sb.append("}");
     setJsonString(sb.toString());
 
     return "success";
   }
 
   public String save()
   {
     Archives archives = (Archives)this.archivesService.get(this.archivesId);
     if (archives != null) {
       ArchDispatch archDispatch = new ArchDispatch();
       AppUser user = ContextUtil.getCurrentUser();
       archDispatch.setArchives(archives);
       archDispatch.setArchUserType(this.archUserType);
       archDispatch.setUserId(user.getUserId());
       archDispatch.setFullname(user.getFullname());
       archDispatch.setDispatchTime(new Date());
       archDispatch.setSubject(archives.getSubject());
       archDispatch.setIsRead(ArchDispatch.HAVE_READ);
       archDispatch.setReadFeedback(this.readFeedback);
       this.archDispatchService.save(archDispatch);
 
       if (this.taskId != null) {
         TaskImpl taskImpl = (TaskImpl)this.taskService.getTask(this.taskId);
 
         TaskImpl superTask = taskImpl.getSuperTask();
         if ((superTask != null) && 
           (superTask.getSubTasks() != null) && 
           (superTask.getSubTasks().size() == 1)) {
           archives.setStatus(this.taskName);
           this.archivesService.save(archives);
         }
       }
       else
       {
         archives.setStatus(this.taskName);
         this.archivesService.save(archives);
       }
       if (ArchDispatch.IS_OVER.compareTo(this.archUserType) == 0) {
         String cruArchDepId = getRequest().getParameter("cruArchDepId");
         if ((StringUtils.isNotEmpty(cruArchDepId)) && (cruArchDepId.indexOf("$") == -1)) {
           ArchivesDep archivesDep = (ArchivesDep)this.archivesDepService.get(new Long(cruArchDepId));
           archivesDep.setHandleFeedback(this.readFeedback);
           this.archivesDepService.save(archivesDep);
         }
 
       }
 
       setJsonString("{success:true}");
     } else {
       setJsonString("{success:false}");
     }
     return "success";
   }
 
   public String read()
   {
     ArchDispatch archDispatch = (ArchDispatch)this.archDispatchService.get(this.dispatchId);
     if (archDispatch != null) {
       archDispatch.setReadFeedback(this.readFeedback);
       archDispatch.setIsRead(ArchDispatch.HAVE_READ);
       archDispatch.setDispatchTime(new Date());
       this.archDispatchService.save(archDispatch);
       setJsonString("{success:true}");
     } else {
       setJsonString("{success:false}");
     }
     return "success";
   }
 
   public String dispatch()
   {
     String disUserIds = getRequest().getParameter("disUserIds");
     String disRoleIds = getRequest().getParameter("disRoleIds");
     Archives archives = (Archives)this.archivesService.get(this.archivesId);
     if (archives != null) {
       if (StringUtils.isNotEmpty(disUserIds)) {
         String[] ids = disUserIds.split(",");
         for (String id : ids) {
           AppUser appUser = (AppUser)this.appUserService.get(new Long(id));
           ArchDispatch archDispatch = new ArchDispatch();
           archDispatch.setArchives(archives);
           archDispatch.setUserId(appUser.getUserId());
           archDispatch.setFullname(appUser.getFullname());
           archDispatch.setDispatchTime(new Date());
           archDispatch.setSubject(archives.getSubject());
           archDispatch.setIsRead(ArchDispatch.NOT_READ);
           archDispatch.setArchUserType(ArchDispatch.IS_DISPATCH);
           this.archDispatchService.save(archDispatch);
         }
       }
       if (StringUtils.isNotEmpty(disRoleIds)) {
         String[] ids = disRoleIds.split(",");
         for (String id : ids) {
           AppRole role = (AppRole)this.appRoleService.get(new Long(id));
           ArchDispatch archDispatch = new ArchDispatch();
           archDispatch.setArchives(archives);
           archDispatch.setDisRoleId(role.getRoleId());
           archDispatch.setDisRoleName(role.getRoleName());
           archDispatch.setDispatchTime(new Date());
           archDispatch.setSubject(archives.getSubject());
           archDispatch.setIsRead(ArchDispatch.NOT_READ);
           archDispatch.setArchUserType(ArchDispatch.IS_DISPATCH);
           this.archDispatchService.save(archDispatch);
         }
       }
       setJsonString("{success:true}");
     } else {
       setJsonString("{success:false}");
     }
     return "success";
   }
 
   public String applicate()
   {
     ArchDispatch archDispatch = (ArchDispatch)this.archDispatchService.get(this.dispatchId);
     if (archDispatch.getUserId() == null) {
       AppUser user = ContextUtil.getCurrentUser();
       archDispatch.setUserId(user.getUserId());
       archDispatch.setFullname(user.getFullname());
       this.archDispatchService.save(archDispatch);
       setJsonString("{success:true}");
     } else {
       setJsonString("{success:false}");
     }
     return "success";
   }
 }

