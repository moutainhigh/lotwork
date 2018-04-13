<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
	<title>帮助后台 添加普通帮助</title>
	<%String path = request.getContextPath(); %>
	
	<script type="text/javascript" src="${staticFileContextPath}/static/js/xheditor121/jquery/jquery-1.4.4.min.js"></script>
	<script type="text/javascript" src="${staticFileContextPath}/static/js/xheditor121/xheditor-1.2.1.min.js"></script>
	<script type="text/javascript" src="${staticFileContextPath}/static/js/xheditor121/xheditor_lang/zh-cn.js"></script>
</head>
<body>	
			<div class="col-crumbs"><div class="crumbs"><strong>当前位置：</strong><a href="#">内容中心</a>&gt; <a href="${currentContextPath}/helpAdmin/goHelpManager">帮助管理</a> &gt; 帮助详情</div></div>
			<div class="col-content">
				<div class="col-main">
					<div class="main panel-help-addcontent">
						<form id="J-form" method="post" action="${currentContextPath}/helpAdmin/createHelp">
							<ul class="ui-form">
								<li>
									<label class="ui-label">所属类目：</label>
									<select id="J-select-type" class="ui-select" name="cateId" disabled>
										<option value="">${help.cateName}</option>
									</select>
									<select id="J-select-type-2" class="ui-select" name="cateId2" disabled>
										<option value="">${help.cateName2}</option>
									</select>
									<span class="ui-check"><i></i></span>
								</li>
								<li>
									<label class="ui-label">标题：</label>
									<input id="J-title" type="text" value="${help.title}" class="input w-6" name="title" disabled>
									<span class="ui-check"><i></i></span>
								</li>
								<li class="checkbox-list">
									<label class="ui-label">是否推荐：</label>
									<span class="radio-list">
										<input id="radio-recommend-1" name="isRec" type="radio" value="1" class="radio" <c:if test="${help.isRec==1}">checked</c:if> disabled><label for="radio-recommend-1" class="label">&nbsp;是</label>
										<input id="radio-recommend-0" name="isRec" type="radio" value="0" class="radio" <c:if test="${help.isRec==0}">checked</c:if> disabled><label for="radio-recommend-0" class="label">&nbsp;否</label>
									</span>
								</li>
								<li>
									<label class="ui-label">简介：</label>
                                    <div class="textarea w-6"><textarea id="J-info" name="preface">${help.preface}</textarea></div>
                                    <span style="padding-top:65px; margin: 0px 0px 0px 10px;" class="ui-prompt">限100字</span><span class="ui-check" style="padding-top:65px; margin: 0px 0px 0px 10px;"><i></i></span>
								</li>
								<li style="margin-top:0;">
									<label class="ui-label">内容：</label>
									<div style="display:inline-block;">
										${help.content}
										<span class="ui-check"><i></i></span>
									</div>
								</li>
								<li>
									<label class="ui-label">序号：</label>
									<input id="J-order" name="no" style="text-align:center;" type="text" class="input w-1" value="${help.no}" disabled>
									<span class="ui-check"><i></i></span>
								</li>

								<li class="ui-btn">
									<a href="javascript:history.back(-1);">返 回<b class="btn-inner"></b></a>
								</li>
								<input type="hidden" id="currentContextPath" name="currentContextPath" value="${currentContextPath}">
							</ul>
						</form>
					</div>
				</div>
				</div>
<script>
	var cates = new Map();
	var cateIds = new Map();
	<c:forEach items="${cateList}" var="cate">
	var cateList${cate.id} = new Array();
	var cateListId${cate.id} = new Array();
	<c:forEach items="${cate.subCate}" var="subCate" varStatus="status">
	cateList${cate.id}[${status.index}] = '${subCate.name}';
	cateListId${cate.id}[${status.index}] = '${subCate.id}';
	</c:forEach>
	cates.put('${cate.id}',cateList${cate.id});
	cateIds.put('${cate.id}',cateListId${cate.id});
	</c:forEach>
	
	$('#J-select-type').change(function() {
		var index = $(this).val();
		var subcates = cates.get(index);
		var idCates = cateIds.get(index);
		var subIds = cates
		for (var i=0; i<subcates.length; i++) {
			$('#J-select-type-2').append('<option value="'+idCates[i]+'">'+subcates[i]+'</option>');
		}
	});
</script>
</body>
</html>