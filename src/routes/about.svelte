<script>
    import {data} from "../stores/storemain.js";
    import message from "../lib/jslib/message.js";
    
</script>
<article class="intro-section">
    <article class="ints">
        <main>

                <div class="mn-one">
                    <div class="upper-txt">
                        <h1>LUANAR APP </h1>
                    </div>
                    <div class="logo">
                        <a href="/">                        
                            <img src="/logo.png" alt="luanar logo">
                        </a>
                    </div>
                    <div class="bottom-txt">
                        <p>{$data.common[0].programme}</p>
                    </div>
                        <div class="foot-txt">
                            <p>© COPYRIGHT | 2022 BUTAO PETER UX / UI DEV</p>
                        </div>

                    <div class="bottom-txt">
                        <p>version {$data.common[0].version}</p>
                    </div>
                </div>

           
                <div class="mn-two">
                    <div class="paragraphs">
                        <main>
                            <div class="main">
                
                                <ul>
                                    <br>
                                    
                                    <p class="notfy"> get in touch with the development team &hookrightarrow;</p>
                                    <div class="cd">

                                        <li><a href="mailto://peterethanbutao@gmail.com">peterethanbutao@gmail.com</a></li>
                                        <li><a href="https://www.butaopeter.netlify.app">peterbutao.netlify.app</a></li>
                                        <li><a href="tel://0880164455">0880164455</a></li>
                                    </div>
                                </ul>
                                <ul>
                                    <li><h1>RATING</h1></li>
                                    <li><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="112" height="16" viewBox="0 0 112 16"><defs><clipPath id="a"><rect width="16" height="16" fill="none"/></clipPath><linearGradient id="e" x1="0.124" y1="0.42" x2="0.544" y2="0.454" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#2699fb"/><stop offset="0.498" stop-color="#175b95"/><stop offset="1"/></linearGradient></defs><g transform="translate(-54 -618)" opacity="0.52"><g transform="translate(54 618)" clip-path="url(#a)"><path d="M8,0l2.5,5,5.5.8L12,9.7l.9,5.5L8,12.6,3.1,15.2,4,9.7,0,5.8,5.5,5Z" fill="#2699fb"/><rect width="16" height="16" transform="translate(0 0)" fill="none"/></g><g transform="translate(78 618)" clip-path="url(#a)"><path d="M8,0l2.5,5,5.5.8L12,9.7l.9,5.5L8,12.6,3.1,15.2,4,9.7,0,5.8,5.5,5Z" fill="#2699fb"/><rect width="16" height="16" transform="translate(0 0)" fill="none"/></g><g transform="translate(102 618)" clip-path="url(#a)"><path d="M8,0l2.5,5,5.5.8L12,9.7l.9,5.5L8,12.6,3.1,15.2,4,9.7,0,5.8,5.5,5Z" fill="#2699fb"/><rect width="16" height="16" transform="translate(0 0)" fill="none"/></g><g transform="translate(126 618)" clip-path="url(#a)"><path d="M8,0l2.5,5,5.5.8L12,9.7l.9,5.5L8,12.6,3.1,15.2,4,9.7,0,5.8,5.5,5Z" fill="url(#e)"/><rect width="16" height="16" transform="translate(0 0)" fill="none"/></g><g transform="translate(150 618)" clip-path="url(#a)"><path d="M8,0l2.5,5,5.5.8L12,9.7l.9,5.5L8,12.6,3.1,15.2,4,9.7,0,5.8,5.5,5Z"/><rect width="16" height="16" transform="translate(0 0)" fill="none"/></g></g></svg></li>
                                </ul>
                                <ul>
                                    <li><h1>READ ME</h1></li>
                                    
                                    <li class="inst-msg">
                                        {#each message as dt}
                                        <p class="instruct">{@html dt.messages}</p>
                                        {/each}
                                    </li>
                                </ul>
                                <ul>
                                    <li><h1>APP INFO</h1></li>
                                
                                    <li><a class="tos" href="/TOS.html">Licence &hookrightarrow;</a></li>
                                </ul>
                
                            </div>
                        </main>
                        
                    </div>
                </div>
           
        </main>
        <footer>
            <div class="ft">
                <p>in association with</p>
                <div class="txt">
                    <h1>developerafrica | 2022</h1>
                    <p>&</p>
                    <h1>makahouse</h1>
                </div>

            </div>
        </footer>
    </article>
</article>

<style lang="scss">
    @import "../app.scss";
   
    .intro-section{
        position: relative;
        top:0 !important;
        width: 100%;
        
        z-index: 200;
        background: var(--bg);
        padding: 0 0 25vh 0;
   
        .ints{
            display: flex;
            flex-direction: column;
            // padding-bottom: 15vh;
            main{
                flex:1;
                display:flex;
                flex-direction: column;
                .mn-one{
                    padding-top: 4vh;
                    text-align: center;
                    .upper-txt{
                        h1{
                            @include font(var(--tc), 1.6rem, 495);
                            
                        }
                    }
                    .logo{
                        margin: auto;
                        padding: 2rem;
                        img{
                            width: 60px;
                        }
                    }
                    p{
                        @include font(var(--tc), 1.3rem, 500);
                        padding: 1rem;
                        
                    }                   
                    
                }
                .mn-two{
                    padding: 2rem;
                    .paragraphs{
                        main{
                            .main{
                                ul{
                                    list-style: none;
                                    padding: 1rem 0;
                                    h1{
                                        text-align: end;
                                        @include font(var(--bl), 1.3rem, 495);
                                        
                                    }
                                    .tos{
                                        text-decoration: none;
                                        @include font(var(--tc), 1.3rem, 495);

                                    }
                                    .notfy{
                                        @include font(var(--tc), 1.3rem, 495);
                                        padding: 1rem 0;
                                        
                                    }
                                    .inst-msg{
                                        padding: 2rem 1rem;
                                        p{
                                            @include font(var(--tc), 1.3rem, 495);
                                            margin: 2rem 0;
                                            a{
                                                color: var(--bl) !important;
    
                                            }
                                        }
                                    }
                                    .cd{
                                        background: var(--wc);                                    
                                        box-shadow: rgba(0, 0, 0, 0.294) 1px 3px 3px 0.1px;
                                        
                                 
                                        padding: 1.5rem;
                                        li{

                                            padding:1.6rem 0;
                                        }
                                        a{
                                            text-decoration: none;
                                            letter-spacing: 0.5px;
                                            @include font(var(--abt-txt), 1.51rem, 500);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                
            }
            footer{
                .ft{
                    padding: 3rem 0;
                    text-align: center;
                    @include font(var(--tc), 1.2rem, 495);
                  


                }
            }
        }
    }
</style>
<!-- <article>
    <div class="content">
        <header>
            <div class="head">
                <a href="/#/">                
                    <div class="logo">
                        <img src="/logo.png" width="100px" alt="logo">
                    </div>
                </a>
                <div class="head-content">
                    <h1>LUANAR APP |  </h1>
                    <h2>VERSION {$data.common[0].version}</h2>
                    <p>
                        <a href="https://developerafrica,netlify.app">DEVELOPER AFRICA | 2022</a>
                    </p>
                    <br>
                    <p>in association with</p>
                    <br>
                    <p>MAKA HOUSE 🐼 | 2022</p>
                    <hr>
                    <p>© COPYRIGHT | 2021 BUTAO PETER</p>
                </div>
            </div>
        </header>
        <main>
            <div class="main">

                <ul>
                    <li><h1>APP INFO</h1></li>
                    <li><a href="./info/readme.html">Read Me</a></li>
                    <li><a href="/TOS.html">Licence</a></li>
                </ul>
                <ul>
                    <li><h1>DEV</h1></li>
                    <p class="notfy"> get in touch with the development team</p>
                    <li><a href="mailto://peterethanbutao@gmail.com">peterethanbutao@gmail.com</a></li>
                    <li><a href="https://www.butaopeter.netlify.app">peterbutao.netlify.app</a></li>
                    <li><a href="tel://0880164455">0880164455</a></li>
                </ul>
                <ul>
                    <li><h1>RATING</h1></li>
                    <li><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="112" height="16" viewBox="0 0 112 16"><defs><clipPath id="a"><rect width="16" height="16" fill="none"/></clipPath><linearGradient id="e" x1="0.124" y1="0.42" x2="0.544" y2="0.454" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#2699fb"/><stop offset="0.498" stop-color="#175b95"/><stop offset="1"/></linearGradient></defs><g transform="translate(-54 -618)" opacity="0.52"><g transform="translate(54 618)" clip-path="url(#a)"><path d="M8,0l2.5,5,5.5.8L12,9.7l.9,5.5L8,12.6,3.1,15.2,4,9.7,0,5.8,5.5,5Z" fill="#2699fb"/><rect width="16" height="16" transform="translate(0 0)" fill="none"/></g><g transform="translate(78 618)" clip-path="url(#a)"><path d="M8,0l2.5,5,5.5.8L12,9.7l.9,5.5L8,12.6,3.1,15.2,4,9.7,0,5.8,5.5,5Z" fill="#2699fb"/><rect width="16" height="16" transform="translate(0 0)" fill="none"/></g><g transform="translate(102 618)" clip-path="url(#a)"><path d="M8,0l2.5,5,5.5.8L12,9.7l.9,5.5L8,12.6,3.1,15.2,4,9.7,0,5.8,5.5,5Z" fill="#2699fb"/><rect width="16" height="16" transform="translate(0 0)" fill="none"/></g><g transform="translate(126 618)" clip-path="url(#a)"><path d="M8,0l2.5,5,5.5.8L12,9.7l.9,5.5L8,12.6,3.1,15.2,4,9.7,0,5.8,5.5,5Z" fill="url(#e)"/><rect width="16" height="16" transform="translate(0 0)" fill="none"/></g><g transform="translate(150 618)" clip-path="url(#a)"><path d="M8,0l2.5,5,5.5.8L12,9.7l.9,5.5L8,12.6,3.1,15.2,4,9.7,0,5.8,5.5,5Z"/><rect width="16" height="16" transform="translate(0 0)" fill="none"/></g></g></svg></li>
                </ul>
                <ul>
                    <li><h1>READ ME</h1></li>
                    <li class="inst-msg">
                        {#each $data.message as dt}
                        <p class="instruct">{@html dt.messages}</p>
                        {/each}
                    </li>
                </ul>

            </div>
        </main>
    </div>
</article>
<style lang="scss">
 
    article{
        background: var(--bg);

        position: relative;
        z-index: 150;
        width:100%;
        
        top:0;
        .content{
            padding-top: 5vh;
            padding-bottom: 10vh;
            main{
                .main{
                    ul{
                        padding:0;
                        margin:0;
                        .notfy{
                            padding: 10px;
                            @include font(var(--bl), 1.4rem, 450);
                            background: var(--l-bl);
                            border-radius: 4px;
                            margin: 10px;
                            box-shadow: rgba(0, 0, 0, 0.315) 3px 4px 4px 3px;
                        }
                        .inst-msg{

                            background: var(--l-bl);
                            border-radius: 4px;
                            margin: 10px;
                            padding: 10px;
                            box-shadow: rgba(0, 0, 0, 0.315) 3px 4px 4px 3px;
                            p{

                                @include font(var(--tc), 1.4rem, 450);
                                padding: 10px;
                            }
                        }
                                              
                        li{
                            list-style: none;
                            padding: 5px ;
                            h1{
                                @include font(var(--bl), 1.5rem, 500)
                            }
                            a{
                                @include font(var(--tc), 1.4rem, 500);
                                text-decoration: none;
                                padding: 10px;
                                
                            }
                            svg{
                                padding: 10px;
                            }
                        }
                    }
                }
            }
            header{
                .head{
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;
                    text-align: center;
                    img{
                        width: 100px;
                    }
                 
                    h1{
                        @include font(var(--tc), 1.5rem, 500);
                        padding: 0.5rem 0;
                    }
                    h2{
                        @include font(var(--bl), 1.15rem, 498);
                        padding-bottom: 2rem;
                    }
                    p{
                        @include font(var(--tc), 1.3rem, 495);
                        
                        a{
                            text-decoration: none;
                            @include font(var(--tc), 1.3rem, 400);

                        }
                    }
                }
            }
        }
    }
</style> -->