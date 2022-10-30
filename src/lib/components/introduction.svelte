<script>
    // Import Swiper Svelte components
    import message from '../jslib/message';
    import Carousel from 'svelte-carousel'
 
    import { createEventDispatcher } from 'svelte';
    

    const dispatch  = createEventDispatcher()

   
</script>
<article class="intro-section">
    <article class="ints">
        <main>
            <Carousel>

                <div class="mn-one">
                    <div class="upper-txt">
                        <h1>WELCOME TO LUANAR APP</h1>
                    </div>
                    <div class="logo">
                        <img src="/favicon.png" alt="luanar logo">
                    </div>
                    <div class="bottom-txt">
                        <p>
                            By using LUANAR APP, you agree to the LUANAR Terms
                            of service and the BUTAO DEV
                            Additional Terms of Service
                        </p>
                    </div>
                    <div class="foot-txt">
                        <p>© COPYRIGHT | 2022 BUTAO PETER UX / UI DEV</p>
                        <p>in association with</p>
                        <h1>DEVELOPER AFRICA MW</h1>
                    </div>
                </div>

            
                <div class="mn-two">
                    <div class="paragraphs">
                        {#each message as dt}
                        <p class="instruct">{@html dt.messages}</p>
                        {/each}                        
                    </div>
                </div>

            </Carousel>

            
        </main>
        <p class="dots" style="color:white;text-align: center;font-size: 2.5rem"><span>.</span><span>.</span></p>
        <footer>
            <div class="ft">
                <button on:click={()=>{dispatch("acceptcontEvent",true)}} >Accept & Continue</button>
            </div>
        </footer>
    </article>
</article>

<style lang="scss">
    @import "../../app.scss";
    .intro-section{
        position: fixed;
        width: 100%;
        top:0;
        left: 0;
        min-height: 100vh;
        z-index: 99;
        background: var(--bg);
        .ints{
            min-height:100vh;
            display: flex;
            flex-direction: column;
            main{
                flex:1;
                display:flex;
                .mn-one{
                    height: 100%; 
                    padding-top: 5vh;
                    text-align: center;
                    .upper-txt{
                        h1{
                            @include font(var(--tc), 1.6rem, 495);
                            padding: 1rem 0;
                        }
                    }
                    .logo{
                        margin: auto;
                        padding: 2rem;
                    }
                    p{
                        @include font(var(--tc), 1.3rem, 500);
                        padding: 1rem;
                        
                    }                   
                    
                }
                .mn-two{
                    padding-top: 10vh;
                    height: 100%; 
                    .paragraphs{

                        padding: 2rem;
                    }
                    
                    
                    p{
                        @include font(var(--tc), 1.3rem, 500);
                        padding: 1rem;

                    }
                }
                
            }
            footer{
                .ft{
                    padding: 3rem 0;
                    text-align: center;
                    button{
                        border : none;
                        background: var(--l-gn);
                        @include font(black, 1.3rem, 500);
                        padding: 1.5rem 2.5rem;
                        border-radius: 5px;
                    }
                }
            }
        }
    }
</style>