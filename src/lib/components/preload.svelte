<script>
    import SVG from "../components/svg.svelte"
</script>
<article class="preload-section">
    <div class="art-ps">
        <div class="top">
            <div class="tp">
                <SVG />
            </div>
        </div>
        <div class="bottom">
            <div class="btm">
                <div class="text">
                    <h1>LUANAR APP</h1>
                </div>
                <div class="svg">
                    <svg width="161" height="4" viewBox="0 0 161 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="161" height="4" fill="var(--gn)"/>
                        </svg>
                        
                </div>
            </div>
        </div>
    </div>
</article>
<style lang="scss">
    .preload-section{
        position: fixed;
        width: 100%;
        z-index: var(--z1);
        min-height: 100vh;
        display:grid;
        top:0;
        left:0;
        background: var(--wc);
        place-items: center;
        .art-ps{
            .bottom{
                text-align: center;
                .btm{
                    .text{
                        h1{
                            @include font(var(--tc), 1rem, 500);
                        }
                    }
                }
              
            }
        }
    }
</style>