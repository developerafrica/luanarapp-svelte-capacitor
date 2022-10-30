<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher()

    let date = new Date()
    function timeFunc(){
        dispatch("timeEvent", true)
    }
</script>
<div class="tm-pcnt">

    <div class="time-card">
      <div class="tm-cd">
          <div class="cancel-svg">
            <button on:click={timeFunc}>

                <svg  width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" stroke="#2EB035"/>
                  <path d="M34.9203 23.636L29.9706 28.5858L25.0208 23.636C24.6362 23.2515 23.9912 23.2515 23.6066 23.636C23.222 24.0206 23.222 24.6657 23.6066 25.0503L29.9706 31.4142L36.3345 25.0503C36.7191 24.6657 36.7191 24.0206 36.3345 23.636C35.95 23.2515 35.3049 23.2515 34.9203 23.636ZM25.0208 36.364L29.9706 31.4142L34.9203 36.364C35.3049 36.7485 35.95 36.7485 36.3345 36.364C36.7191 35.9794 36.7191 35.3343 36.3345 34.9497L29.9706 28.5858L23.6066 34.9497C23.222 35.3343 23.222 35.9794 23.6066 36.364C23.9912 36.7485 24.6362 36.7485 25.0208 36.364Z" fill="#207925"/>
                  </svg>
                  
            </button>
          </div>
          <div class="full-date">
            <h1>{date.toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}</h1>
          </div>
          <div class="full-time">
            <p>{`${date.getHours()} | ${date.getMinutes()}`}</p>
          </div>
          <div class="weekend">
            ... {date.toLocaleDateString("en-GB",{weekday:"long"})} ...
          </div>
          <div class="tm-cd-msg">
            <p>luanar app uses your system defined time</p>
          </div>
      </div>
    </div>

</div>
<style lang="scss">
         @mixin font($c,$s,$w) {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color:$c;
          font-size: $s;
          font-weight: $w;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          
      }
    .tm-pcnt{
        position:fixed;
        min-height: 100vh;
        top: 0;
        left:0;
        background: rgba(0, 0, 0, 0.445);
        z-index: var(--z1);
        width: 100%;
        display: flex;
        align-items: flex-end;
        .time-card{
            padding: 10rem 1rem;
            width: 100%;
            .tm-cd{
                padding: 1rem;
                text-align: center;
                background: var(--bg);
                
                border-radius: 0.9rem;
                .cancel-svg{
                    padding: 1rem;
                    button{
                        border-radius: 4rem;
                        background: none;
                        border:none;
                    }
                }
                .full-date{
                    padding: 1rem;
                    @include font(var(--tc), 1rem, 489);
                }
                .full-time{
                    @include font(var(--tc), 1.2rem, 500);
                    
                }
                .weekend{
                    @include font(var(--gn), 1.2rem, 500);
                    
                }
                .tm-cd-msg{
                    @include font(var(--tc), 1.2rem, 500);
                    padding: 2.5rem 0;

                }
            }
        }
        
    }
</style>