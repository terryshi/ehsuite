 package com.htsoft.oa.action.admin;
 
 import java.lang.reflect.Type;
import java.util.List;

import javax.annotation.Resource;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.htsoft.core.command.QueryFilter;
import com.htsoft.core.web.action.BaseAction;
import com.htsoft.oa.model.admin.BoardType;
import com.htsoft.oa.service.admin.BoardTypeService;
 
 public class BoardTypeAction extends BaseAction
 {
 
   @Resource
   private BoardTypeService boardTypeService;
   private BoardType boardType;
   private Long typeId;
 
   public Long getTypeId()
   {
     return this.typeId;
   }
 
   public void setTypeId(Long typeId) {
     this.typeId = typeId;
   }
 
   public BoardType getBoardType() {
     return this.boardType;
   }
 
   public void setBoardType(BoardType boardType) {
     this.boardType = boardType;
   }
 
   public String list()
   {
     QueryFilter filter = new QueryFilter(getRequest());
     filter.addSorted("typeId", "DESC");
     List<BoardType> list = this.boardTypeService.getAll(filter);
     Type type = new TypeToken<List<BoardType>>() {
     }.getType();
     StringBuffer bf = new StringBuffer("{success:true,'totalCounts':");
     bf.append(filter.getPagingBean().getTotalItems()).append(",result:");
     Gson gson = new Gson();
     bf.append(gson.toJson(list, type)).append("}");
     setJsonString(bf.toString());
     return "success";
   }
 
   public String multiDel()
   {
     String[] ids = getRequest().getParameterValues("typeIds");
     for (String id : ids) {
       this.boardTypeService.remove(new Long(id));
     }
     setJsonString("{success:true}");
     return "success";
   }
 
   public String del()
   {
     this.boardTypeService.remove(this.typeId);
     setJsonString("{success:true}");
     return "success";
   }
 
   public String save()
   {
     this.boardTypeService.save(this.boardType);
     setJsonString("{success:true}");
     return "success";
   }
 
   public String get()
   {
     BoardType boardType = (BoardType)this.boardTypeService.get(this.typeId);
     Gson gson = new Gson();
     StringBuffer bf = new StringBuffer("{success:true,data:");
     bf.append(gson.toJson(boardType)).append("}");
     setJsonString(bf.toString());
     return "success";
   }
 }

