<script>
    import UuidObj from "../lib/jslib/uuid"
    
    
    $: customeFlair = true;
    $: toggle = false;
    $: error = false;
    $: sucess = false;
    $: collapse = false;
    
    
    let ti = '',st = '',lc = '',fl = '',nt = '', listData = []
 
    class ReminderObj{
        constructor(tiP,stP,lcP,ntP,flP, cl){
            this.id = `${UuidObj.uuid()}-${UuidObj.uuid()}`;
            this.date = this.date();
            this.title = tiP;
            this.startTime = stP;
            this.location = lcP;
            this.notes = ntP;
            this.flair = flP;
            this.color = cl;
        };
        date () {
            const dateIn = new Date();
            return dateIn.toLocaleDateString();
        };

    }
   
    let reminderKeyValue = "BUTAO-LASC-V1.1.1-reminderkeyvalue"
    

    if(localStorage.getItem(reminderKeyValue) !== null){
        const localdata  = localStorage.getItem(reminderKeyValue);
        const newdata = JSON.parse(localdata) 
        
        listData = [...newdata]                     
    }

    function submit(e){


        st = (st == "") ? "00:00 unset" : st
        lc = (lc == "") ? "_ unset" : lc
        fl = (fl == "") ? "other" : fl
        
        let color = `hsl(${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}, 100%, 65%)`
        const data =  new ReminderObj(ti,st,lc,nt,fl, color);
        console.log(data)
        
        if (ti == "" ){
            error = true
            setTimeout(() => {
                error  = false                
            }, 5000);
        };
   
        if (ti !== ""){ 


          
            
            if(localStorage.getItem(reminderKeyValue) === null) {
                listData = [...listData, data];
                localStorage.setItem(reminderKeyValue, JSON.stringify(listData))
            }else{
                listData = JSON.parse(localStorage.getItem(reminderKeyValue))
                listData = [...listData, data]
                localStorage.setItem(reminderKeyValue, JSON.stringify(listData))
            }

            ti = "";
            sucess = true
            setTimeout(()=>{
                sucess = false
                toggle =  !toggle
            },2500)
            
        };
    }

    function dispatchdel(e){
            
       
        listData = JSON.parse(localStorage.getItem(reminderKeyValue))
        const newListData = listData.filter(item =>{ return item.id !== e });
        
        localStorage.setItem(reminderKeyValue, JSON.stringify(newListData))
        listData = [...newListData];
        
        

    }

    let select = ["discussion", "assessment", "assignment", "classes", "exams", "other"]


    
</script>
<article class="reminder-section">
    <div class="art-rmdsect">
        <section class="cards-view">
            <div class="cd-vws">
                {#if listData.length == 0}
                <div on:click={()=>{toggle = !toggle}} class="card-empt">
                    <div class="cd">
                        <header>
                            <div style="text-align:center" class="hd">
                                <h1>SUCH EMPTITNESS</h1>
                                
                                <p>PLEASE ADD SOMETHING</p>
                                
                                <p>😪😪😪</p>
                            </div>
                        </header>
                    </div>
                </div>
                {/if}
                {#each listData as dt}
                <div class="card" style="border-left:solid 1px {dt.color};" >
                    <div class="cd">
                        <header>
                            <div class="hd">
                                <h1>
                                    {dt.title}
                                </h1>
                                <div class:shift={collapse} class="flair">
                                    <p style="border: solid 1.2px {dt.color};">
                                        {dt.flair}
                                    </p>
                                </div>
                            </div>
                        </header>
                        {#if !collapse}
                        <main>
                            <div class="mn">
                                <div class="flex">
                                <div class="date">
                                    <p>created : {dt.date}</p>
                                </div>
                                <div class="location">
                                    <p>{dt.location}</p>
                                </div>
                                <div class="time">
                                    <p>{dt.startTime}</p>
                                </div>
                                </div>
                                <div class="note">
                                    <div class="nts">
                                        <p>{dt.notes}</p>
                                        
                                    </div>
                                </div>
                            </div>
                        </main>
                        {/if}
                        <footer>
                            <div class="ft">
                                <button on:click={dispatchdel(dt.id)}>
                                    <i>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <g data-name="Layer 2">
                                                <g data-name="trash-2">
                                                    <rect width="24" height="24" opacity="0"/>
                                                    <path d="M21 6h-5V4.33A2.42 2.42 0 0 0 13.5 2h-3A2.42 2.42 0 0 0 8 4.33V6H3a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8h1a1 1 0 0 0 0-2zM10 16a1 1 0 0 1-2 0v-4a1 1 0 0 1 2 0zm0-11.67c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33V6h-4zM16 16a1 1 0 0 1-2 0v-4a1 1 0 0 1 2 0z"/>
                                                </g>
                                            </g>
                                        </svg>
                                      </i>
                                </button>
                            </div>
                        </footer>
                    </div>
                </div>
                {/each}
            </div>
        </section> 
       
        <section class="reminder-forms">
            <div class="rmd-forms">

                <div class="add-btn">
                    <div class="add">
                        {#if listData.length > 0}
                        <button on:click|preventDefault={()=>{collapse = !collapse}} >
                            <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="45" height="45" rx="15" fill="#2EB035"/>
                                <path d="M17 14H23C23.5439 14 24 13.5439 24 13C24 12.4561 23.5439 12 23 12H17C16.4561 12 16 12.4561 16 13C16 13.5439 16.4561 14 17 14ZM18 13V7C18 6.45614 17.5439 6 17 6C16.4561 6 16 6.45614 16 7V13C16 13.5439 16.4561 14 17 14C17.5439 14 18 13.5439 18 13ZM17.7018 13.7018L23.7018 7.70175C23.8947 7.52632 24 7.2807 24 7C24 6.45614 23.5439 6 23 6C22.7193 6 22.4737 6.10526 22.2982 6.29825L16.2982 12.2982C16.1053 12.4737 16 12.7193 16 13C16 13.5439 16.4561 14 17 14C17.2807 14 17.5263 13.8947 17.7018 13.7018ZM7 18H13C13.5439 18 14 17.5439 14 17C14 16.4561 13.5439 16 13 16H7C6.45614 16 6 16.4561 6 17C6 17.5439 6.45614 18 7 18ZM12 17V23C12 23.5439 12.4561 24 13 24C13.5439 24 14 23.5439 14 23V17C14 16.4561 13.5439 16 13 16C12.4561 16 12 16.4561 12 17ZM12.2982 16.2982L6.29825 22.2982C6.10526 22.4737 6 22.7193 6 23C6 23.5439 6.45614 24 7 24C7.2807 24 7.52632 23.8947 7.70175 23.7018L13.7018 17.7018C13.8947 17.5263 14 17.2807 14 17C14 16.4561 13.5439 16 13 16C12.7193 16 12.4737 16.1053 12.2982 16.2982Z" fill="#F2F2F2"/>
                                </svg>
                                
                                
                                
                        </button>
                        {/if}
                        <button on:click|preventDefault={()=>{toggle = !toggle}} >
                            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="60" height="60" rx="30" fill="#9BD99E"/>
                                <path d="M38 29H31V22C31 21.4561 30.5439 21 30 21C29.4561 21 29 21.4561 29 22V31H38C38.5439 31 39 30.5439 39 30C39 29.4561 38.5439 29 38 29ZM22 31H29V38C29 38.5439 29.4561 39 30 39C30.5439 39 31 38.5439 31 38V29H22C21.4561 29 21 29.4561 21 30C21 30.5439 21.4561 31 22 31Z" fill="white"/>
                                </svg>                                                                  
                        </button>

                    </div>
                </div>

                <form  class:form-clip={toggle}>
                    <div class="fm">
                        <header>
                            {#if error == false && sucess == false}
                            <div class="hd-cancel">
                                <button on:click|preventDefault={()=>{toggle = !toggle}}>
                                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.5" y="0.5" width="59" height="59" rx="29.5" stroke="#B02E2E"/>
                                        <path d="M34.9203 23.636L29.9706 28.5858L25.0208 23.636C24.6362 23.2515 23.9912 23.2515 23.6066 23.636C23.222 24.0206 23.222 24.6657 23.6066 25.0503L29.9706 31.4142L36.3345 25.0503C36.7191 24.6657 36.7191 24.0206 36.3345 23.636C35.95 23.2515 35.3049 23.2515 34.9203 23.636ZM25.0208 36.364L29.9706 31.4142L34.9203 36.364C35.3049 36.7485 35.95 36.7485 36.3345 36.364C36.7191 35.9794 36.7191 35.3343 36.3345 34.9497L29.9706 28.5858L23.6066 34.9497C23.222 35.3343 23.222 35.9794 23.6066 36.364C23.9912 36.7485 24.6362 36.7485 25.0208 36.364Z" fill="#792020"/>
                                    </svg>                                        
                                </button>
                            </div>
                            {/if}
                            {#if error == true}
                            <div class="hd-error">
                                <h1>
                                    title field cannot be empty
                                </h1>
                            </div>
                            {/if}
                            {#if sucess}
                            <div class="hd-sucess">
                                <h1>
                                    title submitted
                                </h1>
                            </div>
                            {/if}
                        </header>
                        <main>
                            <div class="mn-formg">
                                <div class="fm-grp">
                                    <label for="title">TITLE</label>
                                    <input bind:value={ti} type="text" class:redin={error} name="title" placeholder="enter title">
                                </div>
                                <div class="fm-grp">
                                    <label for="starttime">START TIME</label>
                                    <input  bind:value={st} type="time" name="start time" >
                                </div>
                                <div class="fm-grp">
                                    <label for="laction">LOCATION</label>
                                    <input bind:value={lc} type="text" name="location" placeholder="enter location">
                                </div>
                                <div class="fm-grp">
                                    <label for="notes">SIMPLE NOTE</label>
                                    <input bind:value={nt} type="text" name="notes" placeholder="enter a simple note about title">
                                </div>
                                <div class="fm-grp">
                                    <label for="flair">FLAIR</label>
                                    {#if customeFlair}
                                    <select bind:value={fl} name="flair">
                                        {#each select as sl}
                                            <option value="{sl}">{sl}</option>
                                        {/each}
                                    </select>
                                    <label for="flair">flairs are tags to better group your reminders</label>
                                    {/if}
                                    {#if !customeFlair}
                                    <input bind:value={fl} type="text" name="flair" placeholder="enter custome flair">
                                    {/if}
                                    <button on:click|preventDefault={()=>{customeFlair = !customeFlair}}>edit flair</button>
                                </div>
                                
                            </div>
                        </main>
                        <footer>
                            <div class="ft">
                                <button on:click|preventDefault={submit}>SUBMIT</button>
                            </div>
                        </footer>
                    </div>
                </form>

            </div>
        </section>
    </div>
</article>

<style lang="scss">
    @import "../app.scss";
    .form-clip{
        clip-path: circle(1500px) !important;
        pointer-events: all !important;
        
        transition: 1s ease-in-out;
    }
    .shift{
        text-align: end;
        transition: all 1s ease-in-out;
    }
    .redin{

        border: red solid 1px !important;
    }
    .reminder-section{
        .art-rmdsect{
            .cards-view{
                padding: 12vh 1rem;
                .cd-vws{
                    .card-empt{
                        box-shadow: rgba(0, 0, 0, 0.272) 1px 4px 4px 3px;
                    
                        .cd{
                            padding: 1rem;
                            header{
                                h1{
                                    padding: 2.0rem;
                                    @include font(var(--tc), 1.5rem, 500);

                                }
                                p{
                                    padding-top: 1.1rem;
                                    @include font(var(--tc), 1.1rem, 500);

                                }

                            }
                        }
                    }
                    .card{
                        background: var(--rmd-cd);
                        box-shadow: rgba(0, 0, 0, 0.272) 1px 4px 4px 3px;
                    
                        .cd{
                            padding: 0.1rem 2rem 0 0.5rem;
                            margin: 2rem 0;
                            header{
                                .hd{
                                    h1{
                                        @include font(var(--tc), 1.45rem, 500);
                                        padding: 1rem 0;
                                        text-transform: uppercase;
                                    }
                                   
                                    p{
                                        
                                        @include font(var(--tc), 1.19rem, 500);
                                        border-radius: 5px;
                                        padding: 0.25rem 1rem;
                                        display:inline;
                                       
                                        
                                    }
                                }   
                            }
                            main{
                                .mn{
                                    .flex{
                                        display: flex;
                                        justify-content: space-between;
                                        padding: 5px 0;
                                        margin: 5px 0;

                                    }
                                    .date,
                                    .location,
                                    .time{
                                        @include font(var(--tc), 1.2rem, 500);
                                        text-align: end;
                                        padding: 0.25rem;
                                    }
                                    .date{
                                        color: var(--bl)
                                    }
                                    .note{
                                        .nts{
                                            p{
                                                @include font(var(--tc), 1.4rem, 500);
                                                padding: 0.3rem 0;

                                            }
                                        }
                                    }
                                }
                            }
                            footer{
                                .ft{
                                    padding: 1rem 0 0 0;
                                    button{
                                        @include font(var(--tc), 1.4rem, 500);
                                        background: var(--btn-bl);
                                        letter-spacing: 1px;
                                        border: none;
                                        padding: 0.5rem 1rem;
                                        border-radius: 4px;
                                        box-shadow: rgba(0, 0, 0, 0.219) 0 4px 4px 0;
                                        svg{
                                            width: 30px;
                                            fill: #fff !important;
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            }
            .reminder-forms{
                .rmd-forms{
                    .add-btn{
                        position: fixed;
                        right:0;
                        bottom:0;
                        z-index: var(--z4);
                       
                        .add{
                            padding: 0 1rem 15vh 0;
                            display: flex;
                            flex-direction: column;
                            button:nth-child(1){
                
                                margin: 1rem 0;
                              

                            }
                            button{
                                border-radius: 100%;                                                                
                                border: none;
                                background: transparent;
                                
                            }
                        }
                    }
                    form{
                        position: fixed;
                        width: 100%;
                        background: var(--wc);
                        min-height: 100vh;
                        top: 0;
                        left:0;
                        z-index: var(--z1);
                        clip-path: circle(0);
                        -webkit-clip-path: circle(0);
                        pointer-events: none;
                        
                        transition: 1s ease-in-out;
                        .fm{
                            padding: 1rem;
                            header{
                                .hd-error{
                                    text-align: center;
                                    padding: 2rem;
                                    h1{
                                        @include font(var(--tc), 1.4rem, 490);
                                    }
                                    background: rgba(255, 0, 0, 0.342) ;
                                    border-radius: 5px;
                                    text-transform: capitalize;
                                    
                                }
                                .hd-sucess{
                                    text-align: center;
                                    padding: 2rem;
                                    h1{
                                        @include font(var(--tc), 1.4rem, 490);
                                    }
                                    background: rgba(0, 128, 0, 0.296);
                                    border-radius: 5px;
                                    text-transform: capitalize;
                                    
                                }
                                .hd-cancel{
                                    text-align: center;
                                    padding: 1rem;
                                    button{
                                        background: none;
                                        border: none;
                                        border-radius: 4rem;
                                    }    
                                }
                            }
                            main{
                                .mn-formg{
                                    padding: 1rem;
                                    .fm-grp{
                                        display: flex;
                                        flex-direction: column;
                                        label{
                                            text-align: end;
                                            @include font(var(--tc), 1.3rem, 500);
                                            letter-spacing: 1px;
                                            padding: 0.5rem;
                                        }
                                        option{
                                            width: 50%;
                                            @include font(var(--tc), 1.1rem, 500);

                                        }
                                       
                                        select,
                                        input{
                                            padding: 1.5rem 0.5rem;
                                            border: var(--bl) solid 1px;
                                            border-radius: 5px;
                                            box-shadow: rgba(0, 0, 0, 0.219) 0 4px 4px 0;;
                                        }
                                        input[type=text]:focus {
                                            outline: none;
                                            border-left: var(--gn) solid 2px;
                                        }
                                        select{
                                            background: var(--l-gn);
                                            border-left: var(--gn) solid 3px;
                                            option{

                                                color: black !important
                                            }
                                        }
                                        button{
                                            margin: 1rem;

                                            background: none;
                                            padding: 1rem;
                                            background: var(--gn);
                                            border-radius: 4rem;
                                            border: none;
                                            width: 30%;
                                        }
                                    }
                                }
                            }
                            footer{
                                .ft{
                                    text-align: center;
                                    padding: 1rem 0;
                                    button{
                                        border: none;
                                        width: 100%;
                                        border-radius: 5px; 
                                        background: var(--btn-bl);
                                        padding: 1.5rem ;
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