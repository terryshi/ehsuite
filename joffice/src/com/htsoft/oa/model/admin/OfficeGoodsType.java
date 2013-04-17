/*     */ package com.htsoft.oa.model.admin;
/*     */ 
/*     */ import com.htsoft.core.model.BaseModel;
/*     */ import org.apache.commons.lang.builder.EqualsBuilder;
/*     */ import org.apache.commons.lang.builder.HashCodeBuilder;
/*     */ import org.apache.commons.lang.builder.ToStringBuilder;
/*     */ 
/*     */ public class OfficeGoodsType extends BaseModel
/*     */ {
/*     */   protected Long typeId;
/*     */   protected String typeName;
/*     */ 
/*     */   public OfficeGoodsType()
/*     */   {
/*     */   }
/*     */ 
/*     */   public OfficeGoodsType(Long in_typeId)
/*     */   {
/*  38 */     setTypeId(in_typeId);
/*     */   }
/*     */ 
/*     */   public Long getTypeId()
/*     */   {
/*  56 */     return this.typeId;
/*     */   }
/*     */ 
/*     */   public void setTypeId(Long aValue)
/*     */   {
/*  63 */     this.typeId = aValue;
/*     */   }
/*     */ 
/*     */   public String getTypeName()
/*     */   {
/*  71 */     return this.typeName;
/*     */   }
/*     */ 
/*     */   public void setTypeName(String aValue)
/*     */   {
/*  79 */     this.typeName = aValue;
/*     */   }
/*     */ 
/*     */   public boolean equals(Object object)
/*     */   {
/*  86 */     if (!(object instanceof OfficeGoodsType)) {
/*  87 */       return false;
/*     */     }
/*  89 */     OfficeGoodsType rhs = (OfficeGoodsType)object;
/*  90 */     return new EqualsBuilder()
/*  91 */       .append(this.typeId, rhs.typeId)
/*  92 */       .append(this.typeName, rhs.typeName)
/*  93 */       .isEquals();
/*     */   }
/*     */ 
/*     */   public int hashCode()
/*     */   {
/* 100 */     return new HashCodeBuilder(-82280557, -700257973)
/* 101 */       .append(this.typeId)
/* 102 */       .append(this.typeName)
/* 103 */       .toHashCode();
/*     */   }
/*     */ 
/*     */   public String toString()
/*     */   {
/* 110 */     return new ToStringBuilder(this)
/* 111 */       .append("typeId", this.typeId)
/* 112 */       .append("typeName", this.typeName)
/* 113 */       .toString();
/*     */   }
/*     */ }

/* Location:           E:\Workspace\Template Projects\joffice-mysql-tomcat6\tomcat6\webapps\joffice20\WEB-INF\classes\
 * Qualified Name:     com.htsoft.oa.model.admin.OfficeGoodsType
 * JD-Core Version:    0.6.0
 */