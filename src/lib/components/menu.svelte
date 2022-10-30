<script>
    import { createEventDispatcher } from "svelte";

    $: dark = false
    let darkKeyValue  = "BUTAO-LASC-V1.1.1-darkkeyvalue"

    const dispatch = createEventDispatcher()
    function menuFunc(){
        dispatch("menuEvent", true)
    }
    
    $: if(localStorage.getItem(darkKeyValue)  !== null){
        let darkLocal = localStorage.getItem(darkKeyValue)
        dark = JSON.parse(darkLocal)        
    }
    function darkFunc(){
        dark = !dark
        localStorage.setItem(darkKeyValue, JSON.stringify(dark))
        dispatch("darkEvent", true)
    }
</script>
<div class="mnu-pcnt">
    <div class="mp-content">
        <header>
            <div class="hd">
                <button on:click={menuFunc} class="mnu-back">
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g filter="url(#filter0_d_6_147)">
                        <rect x="4" width="44" height="44" rx="4" fill="white" shape-rendering="crispEdges"/>
                        <path d="M28.7018 26.2982L23.807 21.4035C23.5789 21.1754 23.5789 22.8246 23.807 22.5965L28.7018 17.7018C28.8947 17.5263 29 17.2807 29 17C29 16.4561 28.5439 16 28 16C27.7193 16 27.4737 16.1053 27.2982 16.2982L22.4035 21.193C21.9474 21.6316 21.9474 22.3684 22.4035 22.807L27.2982 27.7018C27.4737 27.8947 27.7193 28 28 28C28.5439 28 29 27.5439 29 27C29 26.7193 28.8947 26.4737 28.7018 26.2982Z" fill="#333333"/>
                        </g>
                        <defs>
                        <filter id="filter0_d_6_147" x="0" y="0" width="52" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6_147"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6_147" result="shape"/>
                        </filter>
                        </defs>
                        </svg>
                        
                </button>
            </div>
        </header>
        <main>
            <div class="mn">
                <div class="link-cnt">
                    <div class="lnk">


                        <a  href="https://luanarapp.netlify.app/ads" class="link-card">
                            <header>
                                <div class="lnk-header">
                                    <div class="svg">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M19 15V17C19 18.2632 18.2632 19 17 19H7C5.73684 19 5 18.2632 5 17V7C5 5.73684 5.73684 5 7 5H9C9.54386 5 10 4.54386 10 4C10 3.45614 9.54386 3 9 3H7C4.75439 3 3 4.75439 3 7V17C3 19.2456 4.75439 21 7 21H17C19.2456 21 21 19.2456 21 17V15C21 14.4561 20.5439 14 20 14C19.4561 14 19 14.4561 19 15ZM10.7018 14.7018L20.7018 4.70175C20.8947 4.52632 21 4.2807 21 4C21 3.45614 20.5439 3 20 3C19.7193 3 19.4737 3.10526 19.2982 3.29825L9.29825 13.2982C9.10526 13.4737 9 13.7193 9 14C9 14.5439 9.45614 15 10 15C10.2807 15 10.5263 14.8947 10.7018 14.7018ZM21 10V4.14035C21 3.49123 20.5088 3 19.8596 3H14C13.4561 3 13 3.45614 13 4C13 4.54386 13.4561 5 14 5H19.8596C20.0877 5 19 3.91228 19 4.14035V10C19 10.5439 19.4561 11 20 11C20.5439 11 21 10.5439 21 10Z" fill="#333333"/>
                                            </svg>
                                            
                                    </div>
                                    <div class="txt">
                                        <h1>LUANAR BUSINESS</h1>
                                    </div>
                                </div>
                            </header>
                            <main>
                                <div class="mn">
                                    <p> &odash; view all avalable products avalable on campus</p>
                                    <p>OR / simply submit your product for the luanar online market.</p>
                                </div>
                            </main>
                        </a>
                        <a  href="https://luanarapp.netlify.app/updates" class="link-card">
                            <header>
                                <div class="lnk-header">
                                    <div class="svg">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.7018 14.7018L20.0526 13.3509C21.2982 12.1228 22 10.4211 22 8.64912C22 4.96491 19.0351 2 15.3509 2C13.5789 2 11.8772 2.70175 10.6491 3.94737L9.29825 5.29825C9.10526 5.47368 9 5.7193 9 6C9 6.54386 9.45614 7 10 7C10.2807 7 10.5263 6.89474 10.7018 6.70175L12.0526 5.35088C12.9649 4.4386 14.0351 4 15.3509 4C18.0526 4 20 5.94737 20 8.64912C20 9.96491 19.5614 11.0351 18.6491 11.9474L17.2982 13.2982C17.1053 13.4737 17 13.7193 17 14C17 14.5439 17.4561 15 18 15C18.2807 15 18.5263 14.8947 18.7018 14.7018ZM13.2982 17.2982L11.9474 18.6491C11.0351 19.5614 9.96491 20 8.64912 20C5.94737 20 4 18.0526 4 15.3509C4 14.0351 4.4386 12.9649 5.35088 12.0526L6.70175 10.7018C6.89474 10.5263 7 10.2807 7 10C7 9.45614 6.54386 9 6 9C5.7193 9 5.47368 9.10526 5.29825 9.29825L3.94737 10.6491C2.70175 11.8772 2 13.5789 2 15.3509C2 19.0351 4.96491 22 8.64912 22C10.4211 22 12.1228 21.2982 13.3509 20.0526L14.7018 18.7018C14.8947 18.5263 15 18.2807 15 18C15 17.4561 14.5439 17 14 17C13.7193 17 13.4737 17.1053 13.2982 17.2982ZM9.70175 15.7018L15.7018 9.70175C15.8947 9.52632 16 9.2807 16 9C16 8.45614 15.5439 8 15 8C14.7193 8 14.4737 8.10526 14.2982 8.29825L8.29825 14.2982C8.10526 14.4737 8 14.7193 8 15C8 15.5439 8.45614 16 9 16C9.2807 16 9.52632 15.8947 9.70175 15.7018Z" fill="#333333"/>
                                            </svg>
                                            
                                    </div>
                                    <div class="txt">
                                        <h1>LUANAR APP UPDATES</h1>
                                    </div>
                                </div>
                            </header>
                            <main>
                                <div class="mn">
                                    <p>&odash; see if there is an update avalble for your programmes app</p>
                                </div>
                            </main>
                        </a>
                    </div>
                </div>
                <div class="config-cnt">
                    <div class="cfg-">
                        <header>
                            <div class="hd">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15.75C9.93 15.75 8.25 14.07 8.25 12C8.25 9.93 9.93 8.25 12 8.25C14.07 8.25 15.75 9.93 15.75 12C15.75 14.07 14.07 15.75 12 15.75ZM12 9.75C10.76 9.75 9.75 10.76 9.75 12C9.75 13.24 10.76 14.25 12 14.25C13.24 14.25 14.25 13.24 14.25 12C14.25 10.76 13.24 9.75 12 9.75Z" fill="var(--tc)" fill-opacity="0.87"/>
                                    <path d="M15.21 22.19C15 22.19 14.79 22.16 14.58 22.11C13.96 21.94 13.44 21.55 13.11 21L12.99 20.8C12.4 19.78 11.59 19.78 11 20.8L10.89 20.99C10.56 21.55 10.04 21.95 9.42 22.11C8.79 22.28 8.14 22.19 7.59 21.86L5.87 20.87C5.26 20.52 4.82 19.95 4.63 19.26C4.45 18.57 4.54 17.86 4.89 17.25C5.18 16.74 5.26 16.28 5.09 15.99C4.92 15.7 4.49 15.53 3.9 15.53C2.44 15.53 1.25 14.34 1.25 12.88V11.12C1.25 9.66004 2.44 8.47004 3.9 8.47004C4.49 8.47004 4.92 8.30004 5.09 8.01004C5.26 7.72004 5.19 7.26004 4.89 6.75004C4.54 6.14004 4.45 5.42004 4.63 4.74004C4.81 4.05004 5.25 3.48004 5.87 3.13004L7.6 2.14004C8.73 1.47004 10.22 1.86004 10.9 3.01004L11.02 3.21004C11.61 4.23004 12.42 4.23004 13.01 3.21004L13.12 3.02004C13.8 1.86004 15.29 1.47004 16.43 2.15004L18.15 3.14004C18.76 3.49004 19.2 4.06004 19.39 4.75004C19.57 5.44004 19.48 6.15004 19.13 6.76004C18.84 7.27004 18.76 7.73004 18.93 8.02004C19.1 8.31004 19.53 8.48004 20.12 8.48004C21.58 8.48004 22.77 9.67004 22.77 11.13V12.89C22.77 14.35 21.58 15.54 20.12 15.54C19.53 15.54 19.1 15.71 18.93 16C18.76 16.29 18.83 16.75 19.13 17.26C19.48 17.87 19.58 18.59 19.39 19.27C19.21 19.96 18.77 20.53 18.15 20.88L16.42 21.87C16.04 22.08 15.63 22.19 15.21 22.19ZM12 18.49C12.89 18.49 13.72 19.05 14.29 20.04L14.4 20.23C14.52 20.44 14.72 20.59 14.96 20.65C15.2 20.71 15.44 20.68 15.64 20.56L17.37 19.56C17.63 19.41 17.83 19.16 17.91 18.86C17.99 18.56 17.95 18.25 17.8 17.99C17.23 17.01 17.16 16 17.6 15.23C18.04 14.46 18.95 14.02 20.09 14.02C20.73 14.02 21.24 13.51 21.24 12.87V11.11C21.24 10.48 20.73 9.96004 20.09 9.96004C18.95 9.96004 18.04 9.52004 17.6 8.75004C17.16 7.98004 17.23 6.97004 17.8 5.99004C17.95 5.73004 17.99 5.42004 17.91 5.12004C17.83 4.82004 17.64 4.58004 17.38 4.42004L15.65 3.43004C15.22 3.17004 14.65 3.32004 14.39 3.76004L14.28 3.95004C13.71 4.94004 12.88 5.50004 11.99 5.50004C11.1 5.50004 10.27 4.94004 9.7 3.95004L9.59 3.75004C9.34 3.33004 8.78 3.18004 8.35 3.43004L6.62 4.43004C6.36 4.58004 6.16 4.83004 6.08 5.13004C6 5.43004 6.04 5.74004 6.19 6.00004C6.76 6.98004 6.83 7.99004 6.39 8.76004C5.95 9.53004 5.04 9.97004 3.9 9.97004C3.26 9.97004 2.75 10.48 2.75 11.12V12.88C2.75 13.51 3.26 14.03 3.9 14.03C5.04 14.03 5.95 14.47 6.39 15.24C6.83 16.01 6.76 17.02 6.19 18C6.04 18.26 6 18.57 6.08 18.87C6.16 19.17 6.35 19.41 6.61 19.57L8.34 20.56C8.55 20.69 8.8 20.72 9.03 20.66C9.27 20.6 9.47 20.44 9.6 20.23L9.71 20.04C10.28 19.06 11.11 18.49 12 18.49Z" fill="var(--tc)" fill-opacity="0.87"/>
                                    </svg>
                                    
                            </div>
                        </header>
                        <hr>
                        <main>
                            <div class="mn">
                                <button on:click={darkFunc} class="theme">
                                    {#if dark}
                                    <p>light theme</p>
                                    {/if}
                                    {#if !dark}
                                    <p>dark theme</p>
                                    {/if}
                                    <i><svg width="24" height="33" viewBox="0 0 24 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 20C7.45614 20 4 16.5439 4 12C4 7.45614 7.45614 4 12 4C16.5439 4 20 7.45614 20 12C20 16.5439 16.5439 20 12 20ZM12 22C17.5263 22 22 17.5263 22 12C22 6.47368 17.5263 2 12 2C6.47368 2 2 6.47368 2 12C2 17.5263 6.47368 22 12 22Z" fill="#333333"/>
                                        <rect x="7.5" y="25" width="9" height="2" rx="1" fill="black"/>
                                        <rect x="7.5" y="25" width="9" height="2" rx="1" fill="black"/>
                                        <rect x="7.5" y="25" width="9" height="2" rx="1" fill="black"/>
                                        <rect x="7.5" y="25" width="9" height="2" rx="1" fill="black"/>
                                        <rect x="7.5" y="25" width="9" height="2" rx="1" fill="black"/>
                                        <rect x="7.5" y="28" width="9" height="2" rx="1" fill="black"/>
                                        <rect x="7.5" y="28" width="9" height="2" rx="1" fill="black"/>
                                        <rect x="7.5" y="28" width="9" height="2" rx="1" fill="black"/>
                                        <rect x="7.5" y="28" width="9" height="2" rx="1" fill="black"/>
                                        <rect x="7.5" y="28" width="9" height="2" rx="1" fill="black"/>
                                        <rect x="9.5" y="31" width="5" height="2" rx="1" fill="black"/>
                                        <rect x="9.5" y="31" width="5" height="2" rx="1" fill="black"/>
                                        <rect x="9.5" y="31" width="5" height="2" rx="1" fill="black"/>
                                        <rect x="9.5" y="31" width="5" height="2" rx="1" fill="black"/>
                                        <rect x="9.5" y="31" width="5" height="2" rx="1" fill="black"/>
                                        </svg>
                                        </i>
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </main>
    </div>
</div>
<style lang="scss">
    @import "../../app.scss";
    .mnu-pcnt{
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        background: var(--bg);
        z-index: var(--z4);
        min-height: 100vh;
        .mp-content{
            padding: 2rem;
            header{
                padding: 2rem 0;
                .hd{
                    button{
                        border: none;
                        background:none;
                    }
                }
            }
            main{
                .mn {
                    .link-cnt{
                        .lnk{

                            a{
                                background: var(--mn-cd);
                                display: block;
                                margin: 2rem 0;
                                padding: 1rem;
                                text-decoration: none;
                                border-radius: 5px;
                                box-shadow: rgba(0, 0, 0, 0.224) 0 4px 4px 0;
                                
                                header{
                                    padding: 1rem;
                                    background: #F5FBF5;
                                    border-radius: 4px;
                                    box-shadow: rgba(0, 0, 0, 0.224) 0 4px 4px 0;
                                    .lnk-header{
                                        display: flex;
                                        align-items: center;
                                        justify-content:start;
                                        h1{
                                            @include font(black, 1.4rem, 500);
                                            padding: 0 2rem;
                                        }
                                    }
                                }
                                main{
                                    .mn{
                                        p{
                                            @include font(var(--tc), 1rem, 500);
                                            padding: 1rem 0;
                                            
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .config-cnt{
                        .cfg-{
                            main{
                                .mn{
                                    button{
                                        background: #fafafaab;
                                        border: none;
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-evenly;
                                        padding: 0.5rem 1.5rem;
                                        margin: 1rem 0;
                                        box-shadow: rgba(0, 0, 0, 0.25) 0 4px 4px 0;
                                        svg{
                                            width: 15px;
                                        }
                                        p{
                                            @include font(black, 1.3rem, 500);
                                            padding: 0 1rem;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>