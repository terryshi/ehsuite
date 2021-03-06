 package com.htsoft.oa.action.flow;
 
 import com.google.gson.Gson;
 import com.htsoft.core.jbpm.jpdl.Node;
 import com.htsoft.core.web.action.BaseAction;
 import com.htsoft.oa.model.flow.ProDefinition;
 import com.htsoft.oa.model.flow.ProUserAssign;
 import com.htsoft.oa.service.flow.JbpmService;
 import com.htsoft.oa.service.flow.ProDefinitionService;
 import com.htsoft.oa.service.flow.ProUserAssignService;
 import java.util.List;
 import javax.annotation.Resource;
 import javax.servlet.http.HttpServletRequest;
 import org.apache.commons.lang.StringUtils;
 
 public class ProUserAssignAction extends BaseAction
 {
 
   @Resource
   private ProUserAssignService proUserAssignService;
 
   @Resource
   private JbpmService jbpmService;
 
   @Resource
   private ProDefinitionService proDefinitionService;
   private ProUserAssign proUserAssign;
   private Long assignId;
 
   public void setJbpmService(JbpmService jbpmService)
   {
     this.jbpmService = jbpmService;
   }
 
   public Long getAssignId()
   {
     return this.assignId;
   }
 
   public void setAssignId(Long assignId) {
     this.assignId = assignId;
   }
 
   public ProUserAssign getProUserAssign() {
     return this.proUserAssign;
   }
 
   public void setProUserAssign(ProUserAssign proUserAssign) {
     this.proUserAssign = proUserAssign;
   }
 
   public String list()
   {
     Gson gson = new Gson();
 
     String defId = getRequest().getParameter("defId");
 
     ProDefinition proDefinition = (ProDefinition)this.proDefinitionService.get(new Long(defId));
 
     List nodes = this.jbpmService.getTaskNodesByDefId(new Long(defId));
 
     List nodesAssignList = this.proUserAssignService.getByDeployId(proDefinition.getDeployId());
 
     StringBuffer buff = new StringBuffer("{result:[");
 
     for (int i = 0; i < nodes.size(); i++) {
       String nodeName = ((Node)nodes.get(i)).getName();
       buff.append("{activityName:'").append(nodeName).append("',deployId:'" + proDefinition.getDeployId()).append("'");
       for (int j = 0; j < nodesAssignList.size(); j++) {
         ProUserAssign assign = (ProUserAssign)nodesAssignList.get(j);
         if (!nodeName.equals(assign.getActivityName())) continue;
         buff.append(",assignId:'").append(gson.toJson(assign.getAssignId()).replace("\"", ""))
           .append("',userId:'").append(assign.getUserId() == null ? "" : assign.getUserId())
           .append("',username:'").append(gson.toJson(assign.getUsername()).replace("\"", ""))
           .append("',roleId:'").append(assign.getRoleId() == null ? "" : assign.getRoleId())
           .append("',roleName:'").append(gson.toJson(assign.getRoleName()).replace("\"", ""))
           .append("',jobId:'").append(assign.getJobId() == null ? "" : assign.getJobId())
           .append("',jobName:'").append(assign.getJobName() == null ? "" : assign.getJobName())
           .append("',reJobId:'").append(assign.getReJobId() == null ? "" : assign.getReJobId())
           .append("',reJobName:'").append(assign.getReJobName() == null ? "" : assign.getReJobName())
           .append("',isSigned:'").append(assign.getIsSigned() == null ? 0 : assign.getIsSigned().shortValue()).append("'");
         break;
       }
 
       buff.append("},");
     }
 
     if (!nodes.isEmpty()) {
       buff.deleteCharAt(buff.length() - 1);
     }
 
     buff.append("]}");
 
     setJsonString(buff.toString());
 
     return "success";
   }
 
   public String get()
   {
     ProUserAssign proUserAssign = (ProUserAssign)this.proUserAssignService.get(this.assignId);
 
     Gson gson = new Gson();
 
     StringBuffer sb = new StringBuffer("{success:true,data:");
     sb.append(gson.toJson(proUserAssign));
     sb.append("}");
     setJsonString(sb.toString());
 
     return "success";
   }
 
   public String save()
   {
     String data = getRequest().getParameter("data");
 
     if (StringUtils.isNotEmpty(data)) {
       Gson gson = new Gson();
       ProUserAssign[] assigns = (ProUserAssign[])gson.fromJson(data, com.htsoft.oa.model.flow.ProUserAssign[].class);
       for (ProUserAssign assign : assigns) {
         if (assign.getAssignId().longValue() == -1L) {
           assign.setAssignId(null);
         }
         this.proUserAssignService.save(assign);
       }
 
     }
 
     return "success";
   }
 }

