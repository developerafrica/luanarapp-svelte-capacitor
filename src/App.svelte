<script>

    import Router from "svelte-spa-router";
    import { link } from "svelte-spa-router";
    import ABOUT from "./routes/about.svelte";
    import ANALYTICS from "./routes/analytics.svelte";
    import HOME from "./routes/index.svelte";
    import REMINDER from "./routes/reminder.svelte";
    import TABLE from "./routes/table.svelte";
    import SLUG from "./routes/slug.svelte";
    //stores
    import {data} from "./stores/storemain"
 

    //lib
    import TIMECARD from "./lib/components/timecard.svelte"
    import MENU from "./lib/components/menu.svelte"
    import INTRO from "./lib/components/introduction.svelte"
    
    let date = new Date()
    let darkKeyValue  = "BUTAO-LASC-V1.1.1-darkkeyvalue"
    let introKeyValue  = "BUTAO-LASC-V1.1.1-introkeyvalue"


    $: timetogglevar = false
    $: menutogglevar = false
    $: darktogglevar = false
    $: introtoggle = false
   
    
    function acceptcontListener(){
      introtoggle = false
      localStorage.setItem(introKeyValue, JSON.stringify(false))  
    }    
    function timeListener(){
        timetogglevar = !timetogglevar
    }
    function menuListener(){
        menutogglevar = !menutogglevar
    }
    function darkListener(){
        darktogglevar = !darktogglevar
    }
  

    $: if(localStorage.getItem(darkKeyValue) !== null){
        let darkLocal = localStorage.getItem(darkKeyValue)
        darktogglevar  = JSON.parse(darkLocal)
    }
    
    $: if (localStorage.getItem(introKeyValue) == null) {
            introtoggle = true            
        }
    
    
    $: if (localStorage.getItem(introKeyValue) !== null) {
            let introLocal = localStorage.getItem(introKeyValue)
            introtoggle = JSON.parse(introLocal)        
        } 
 



</script>

<Router
    routes={{
        "/": HOME,
        "/about": ABOUT,
        "/analytics": ANALYTICS,
        "/table": TABLE,
        "/reminder": REMINDER,
        "/slug/:code": SLUG
        
    }}
/>


{#if introtoggle}
<div class="introduction">
    <INTRO on:acceptcontEvent={acceptcontListener} />
</div>
{/if}

<div  class="main-layout">
    <div class="mn-lyout">
      <div class="upper-navigation">
        <div class="up-nv">
          <nav>
            <div class="nv">
  
              <div class="menu">
                <div class="mnu">
                  <button on:click={menuListener}>
  
                    <svg width="45" height="44" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g filter="url(#filter0_d_33_34)">
                      <rect x="4" width="37" height="36" rx="3" fill="#F5FBF5"/>
                      </g>
                      <path d="M13.5 18C13.5 19.1053 14.3947 20 15.5 20C16.6053 20 17.5 19.1053 17.5 18C17.5 16.8947 16.6053 16 15.5 16C14.3947 16 13.5 16.8947 13.5 18ZM20.5 18C20.5 19.1053 21.3947 20 22.5 20C23.6053 20 24.5 19.1053 24.5 18C24.5 16.8947 23.6053 16 22.5 16C21.3947 16 20.5 16.8947 20.5 18ZM27.5 18C27.5 19.1053 28.3947 20 29.5 20C30.6053 20 31.5 19.1053 31.5 18C31.5 16.8947 30.6053 16 29.5 16C28.3947 16 27.5 16.8947 27.5 18Z" fill="#333333"/>
                      <defs>
                      <filter id="filter0_d_33_34" x="0" y="0" width="45" height="44" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="4"/>
                      <feGaussianBlur stdDeviation="2"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.37 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_33_34"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_33_34" result="shape"/>
                      </filter>
                      </defs>
                      </svg>
                  </button>
                    
                </div>
                <div class="progname">
                  {#each $data.common as dc}
                  <h1>{dc.programme}</h1>
                  {/each}
                </div>
              </div>
  
              <div class="time">
                <div class="tm">
                  <button on:click={timeListener} >{`${date.getDate()} | ${date.toLocaleDateString("en-GB",{weekday : "long"})}`}</button>
                </div>
              </div>
  
            </div>
          </nav>
  
          <div class="popup-content">
            <div class="ppp-cnt">
  
              <article class:clipclass={timetogglevar} class=" time-pcnt">
                <TIMECARD on:timeEvent={timeListener}/>
              </article>
  
              <article class:clipclass={menutogglevar} class="menu-pcnt">
                <MENU on:darkEvent={darkListener} on:menuEvent={menuListener} />
              </article>
            </div>
          </div>
        </div>
      </div>
    
      <div class="lowwer-navigation">
        <div class="lw-nv">
          <nav>
            <div class="nv">
              <div class="left">
                <ul>
                  <li>
                    <a use:link href="/">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 14C15 12.3333 13.6667 11 12 11C10.3333 11 9 12.3333 9 14V19H7C5.77193 19 5 18.2281 5 17V11.2456C5 10.6316 5.15789 10.2456 5.57895 9.82456L10.5789 4.82456C11.4737 3.94737 12.5263 3.94737 13.4211 4.82456L18.4211 9.82456C18.8421 10.2456 19 10.6316 19 11.2456V17C19 18.2281 18.2281 19 17 19H15V14ZM13 14V21H17C19.2105 21 21 19.2105 21 17V11.2456C21 10.1754 20.5789 9.15789 19.8246 8.42105L14.8246 3.42105C13.2632 1.84211 10.7368 1.84211 9.17544 3.42105L4.17544 8.42105C3.42105 9.15789 3 10.1754 3 11.2456V17C3 19.2105 4.78947 21 7 21H11V14C11 13.3158 11.3158 13 12 13C12.6842 13 13 13.3158 13 14ZM14 19H10V21H14V19Z" fill="var(--svg)"/>
                        </svg>
                        
                    </a>
                  </li>
                  <li>
                    <a use:link href="/table">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 11H8C7.45614 11 7 11.4561 7 12C7 12.5439 7.45614 13 8 13H16C16.5439 13 17 12.5439 17 12C17 11.4561 16.5439 11 16 11ZM12 15H8C7.45614 15 7 15.4561 7 16C7 16.5439 7.45614 17 8 17H12C12.5439 17 13 16.5439 13 16C13 15.4561 12.5439 15 12 15ZM17 5C18.2632 5 19 5.73684 19 7H5C5 5.73684 5.73684 5 7 5H17ZM17 3H7C4.75439 3 3 4.75439 3 7V9H21V7C21 4.75439 19.2456 3 17 3ZM5 9H19V17C19 18.2632 18.2632 19 17 19H7C5.73684 19 5 18.2632 5 17V9ZM3 7V17C3 19.2456 4.75439 21 7 21H17C19.2456 21 21 19.2456 21 17V7H3ZM6 2V4C6 4.54386 6.45614 5 7 5C7.54386 5 8 4.54386 8 4V2C8 1.45614 7.54386 1 7 1C6.45614 1 6 1.45614 6 2ZM18 4V2C18 1.45614 17.5439 1 17 1C16.4561 1 16 1.45614 16 2V4C16 4.54386 16.4561 5 17 5C17.5439 5 18 4.54386 18 4Z" fill="var(--svg)"/>
                        </svg>                    
                    </a>
                  </li>
                  <li>
                    <a use:link href="/analytics" >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 11H19C19.5439 11 20 10.5439 20 10C20 9.45614 19.5439 9 19 9H12C11.4561 9 11 9.45614 11 10C11 10.5439 11.4561 11 12 11ZM12 2H8C5.78947 2 4 3.78947 4 6V18C4 20.2105 5.78947 22 8 22H16C18.2105 22 20 20.2105 20 18V10C20 9.45614 19.5439 9 19 9C18.4561 9 18 9.45614 18 10V18C18 19.2281 17.2281 20 16 20H8C6.77193 20 6 19.2281 6 18V6C6 4.77193 6.77193 4 8 4H12C12.5439 4 13 3.54386 13 3C13 2.45614 12.5439 2 12 2ZM11 3V10C11 10.5439 11.4561 11 12 11C12.5439 11 13 10.5439 13 10V3C13 2.45614 12.5439 2 12 2C11.4561 2 11 2.45614 11 3ZM19.7018 9.29825L12.7018 2.29825C12.5263 2.10526 12.2807 2 12 2C11.4561 2 11 2.45614 11 3C11 3.2807 11.1053 3.52632 11.2982 3.70175L18.2982 10.7018C18.4737 10.8947 18.7193 11 19 11C19.5439 11 20 10.5439 20 10C20 9.7193 19.8947 9.47368 19.7018 9.29825Z" fill="var(--svg)"/>
                        </svg>
                        
                        
                    </a>
                  </li>
                  <li>
                    <a use:link href="/reminder">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 11H13V4C13 3.45614 12.5439 3 12 3C11.4561 3 11 3.45614 11 4V13H20C20.5439 13 21 12.5439 21 12C21 11.4561 20.5439 11 20 11ZM4 13H11V20C11 20.5439 11.4561 21 12 21C12.5439 21 13 20.5439 13 20V11H4C3.45614 11 3 11.4561 3 12C3 12.5439 3.45614 13 4 13Z" fill="var(--svg)"/>
                        </svg>                     
                    </a>
                  </li>
                </ul>
  
              </div>
              <div class="right">
                <ul>
                  <li>
                    <a use:link  href="/about" >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 20C7.45614 20 4 16.5439 4 12C4 7.45614 7.45614 4 12 4C16.5439 4 20 7.45614 20 12C20 16.5439 16.5439 20 12 20ZM12 22C17.5263 22 22 17.5263 22 12C22 6.47368 17.5263 2 12 2C6.47368 2 2 6.47368 2 12C2 17.5263 6.47368 22 12 22ZM13 13.3333C13 12.0877 15.5263 11.7018 15.5088 9.49123C15.5088 7.5614 13.9474 6 12 6C10.0526 6 8.50877 7.57895 8.50877 9.49123C8.50877 10.0351 8.96491 10.4912 9.50877 10.4912C10.0526 10.4912 10.5088 10.0351 10.5088 9.49123C10.5088 8.52632 11.0351 8 12 8C12.9649 8 13.5088 8.54386 13.5088 9.49123C13.5263 10.6842 11 11.1228 11 13.3333C11 13.8772 11.4561 14.3333 12 14.3333C12.5439 14.3333 13 13.8772 13 13.3333ZM12 18C12.7368 18 13.3333 17.4035 13.3333 16.6667C13.3333 15.9298 12.7368 15.3333 12 15.3333C11.2632 15.3333 10.6667 15.9298 10.6667 16.6667C10.6667 17.4035 11.2632 18 12 18Z" fill="var(--bl)"/>
                        </svg>
                        
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
  
  <svelte:head>
    {#if darktogglevar}
    <style>
        body{
        background: hsl(208, 96%, 4%) !important;
        height: 100%;
        --bg: hsl(208, 96%, 4%) !important;
        --l-bl: hsl(207, 38%, 24%) !important;
        --rmd-cd: hsl(207, 38%, 24%) !important;
        --wc: hsl(208, 80%, 10%) !important;
        --tc: seashell !important;
        --mn-cd: rgb(122, 122, 122, .4) !important;
        --abt-txt: hsl(208, 96%, 90%) !important;
      }
    </style>
    {/if}
  </svelte:head>
  
  <style lang="scss">
    @import "./app.scss";
    
    .clipclass{
      pointer-events: all !important;
      opacity: 100% !important;
      clip-path: circle(1500px) !important;
      -webkit-clip-path: circle(1500px) !important;
      transition: 1s ease-in-out;
    }
    .time-pcnt{
      pointer-events: none;
      opacity: 0;
      clip-path: circle(0);
      -webkit-clip-path: circle(0);
      transition: 1s ease-in-out;
    }
    .menu-pcnt{
      pointer-events: none;
      opacity: 0;
      clip-path: circle(0);
      -webkit-clip-path: circle(0);
      transition: 1s ease-in-out;
    }
    .main-layout{
      .mn-lyout{
        .upper-navigation{
          position: fixed;
          z-index: var(--z2);
          top:0;
          left:0;
          width: 100%;
          .up-nv{
            padding: 1rem;
            nav{
              .nv{
                display: flex;
                align-items: center;
                justify-content: space-between;
                .menu{
                  display: flex;
                  align-items: center;
                  h1{
                    @include font(var(--tc), 1.5rem, 600);
                    margin: 0 10px;
                    letter-spacing: 1px;
                  }
                  .mnu{
                    button{
                      background: none;
                      border: none;
                    }
                  }
                }
                .time{
                  .tm{
                    button{
                      background: var(--yw);
                      border: none;
                      @include font(black, 1.2rem, 495);
                      border-radius: 4rem;
                      padding: 1rem 2rem;
  
                    }
                  }
                }
              }
            }
          }
        }
        .lowwer-navigation{
          position: fixed;
          z-index: var(--z2);
          bottom: 0;
          left:0;
          width: 100%;
          .lw-nv{
            padding: 2px 2px 2rem 2px;
            
            nav{
              .nv{
                display: flex;
                justify-content: space-between;
                align-items: center;
                ul{
                  list-style: none;
                  
                  li{
                    a{
                      display: block;
                      padding: 1.4rem;
                    }
                  }
                }
                .left{
                  background: var(--nv);
                  box-shadow: rgba(0, 0, 0, 0.211) -4px 2px 4px 0;
                  flex:1;
                  border-radius: 4rem;
                  padding: 2px;
                  ul{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  
                    li {
                              list-style: none;
                              padding: 0;
                              margin: 0;
                              a {
                                  filter: grayscale(35%);
                                  display: block;
                                  padding: 10px 15px;
                                  height: 100%;
                                  border-radius: 6px;
                                  background: transparent;
                                  box-shadow: 0 0 20px rgba(0, 0, 0, 0.07);
                                  animation: bouncer
                                      cubic-bezier(0.455, 0.03, 0.515, 0.955)
                                      0.75s infinite alternate;
  
                                  svg {
                                      animation: bouncer
                                          cubic-bezier(0.455, 0.03, 0.515, 0.955)
                                          0.75s infinite alternate;
                                  }
                              }
                          }
                          li:nth-child(1) {
                              a {
                                  animation-delay: calc(0s + (0.1s * 4));
                                  svg {
                                      animation-delay: calc(0s + (0.1s * 4));
                                    
                                  }
                              }
                          }
                          li:nth-child(2) {
                              a {
                                  animation-delay: calc(0s + (0.1s * 6));
                                  svg {
                                      animation-delay: calc(0s + (0.1s * 6));
                                    
                                  }
                              }
                          }
                          li:nth-child(3) {
                              a {
                                  animation-delay: calc(0s + (0.1s * 8));
                                
                                  svg {
  
                                      animation-delay: calc(0s + (0.1s * 8));
                                  }
                              }
                          }
                          li:nth-child(4) {
                              a {
                                  animation-delay: calc(0s + (0.1s * 10));
                                  svg {
  
                                      animation-delay: calc(0s + (0.1s * 10));
                                  }
                              }
                          }
  
                  }
                }
                .right{
                  padding: 0 1.5rem;
                  ul{
                    li{
                      a{
                        padding: 1.3rem;
                      }
                      background: var(--l-bl) ;
                      border-radius: 4rem;
                    }
                  }
  
                }
              }
            }
          }
        }
      }
    }
    @keyframes bouncer {
      to {
  
          transform: scale(1) translateY(-3.4px);
      }
    }
  </style>
