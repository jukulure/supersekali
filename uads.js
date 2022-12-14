var current     = window.location.href;
        var origin      = window.location.origin;
        var g_confirm   = current.includes('c=1');
        var go_ads      = '{{ADS_LINK}}';
        var is_cli      = '{{IS_CLI}}';
        var is_uads     = '{{IS_UADS}}';

        $(document).ready(function()
        {
            if(go_ads.includes('//'))
            {
                if(!g_confirm && !is_uads)
                {
                    $(window).scroll(function (event) {
                        var scroll = $(window).scrollTop();
                        if (scroll >= 200) {
                            $('#popbox').removeClass('hide');
                        }
                        console.log('scroll..');                    
                    });
                }

                $(document).on('click','.g_url',function(e)
                {
                    e.preventDefault();

                    var g_target=current.includes("?")?current+"&c=1":current+"?c=1";

                    window.open(go_ads,"_blank");
                    window.location.href=g_target;
                });

                $(document).on('click','.ads-img',function(e)
                {
                    e.preventDefault();
                    window.open(go_ads, '_blank');
                });
            }

            $("[id*='google-cache']").remove();        

            $(document).on('submit','#search-box',function(e){
                e.preventDefault();

                var query = $('#search_query').val();
                query = query.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '').replace(/\s\s+/g, ' ');

                if(is_cli)
                {
                  var target  = 'site:'+location.host+' '+query;
                  var uri     = 'https://www.google.com/search?q='+encodeURIComponent(target);
                }
                else
                {                    
                    var niche = $('#search_niche').val();
                    var uri   = `${origin}/search?n=${encodeURIComponent(niche)}&q=${encodeURIComponent(query)}`;
                }
                window.open(uri, '_self');
            });
        });
