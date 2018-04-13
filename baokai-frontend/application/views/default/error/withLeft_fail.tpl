<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>{$title|default:"错误页面"}</title>
    <link rel="stylesheet" href="{$path_img}/images/common/base.css" />
    <link rel="stylesheet" href="{$path_img}/images/ucenter/safe/safe.css" />
    <link rel="stylesheet" href="{$path_img}/images/common/js-ui.css" />
    {include file='/default/script-base.tpl'}
</head>
<body>
    {if $errView neq ''}
        {include file="/default/$errView/header.tpl"}
    {/if}
    
    <div class="g_33 common-main">
        <div class="g_5">
            <!-- //////////////左侧公共页面////////////// -->
                {if $errView neq ''}
                    {include file="/default/$errView/left.tpl"}
                {/if}
            <!-- /////////////左侧公共页面/////////////// -->    
        </div>
            <div class="g_27">
                <div class="content">
                	{if $tab neq ''}
                    <div class="title">{$tab}</div>
                    {/if}
                    <div class="alert alert-error">
                        <i></i>
                        <div class="txt">
                            <h4 >{$msgTitle}</h4><br/>
                             <p>{$msgContent}</p>
                            {foreach $errList as $err}
                              <font color="red"><b>{$err}</b></font><br/>
                            {/foreach}<br/>
                            
                            {if $redURL neq ''}{foreach $redURL as $item}
                              	<a class="{if $item.isBtn eq '1'}btn btn-small{else}{/if}" href="{$item.url}">{$item.title}<b class="btn-inner"></b></a> {if $item@last}{else}|{/if}
                            {/foreach}
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
    </div>
    <!-- //////////////底侧公共页面////////////// -->
        {if $errView neq ''}
            {include file="/default/$errView/footer.tpl"}
        {/if}
    <!-- /////////////底侧公共页面/////////////// -->    
</body>
</html>