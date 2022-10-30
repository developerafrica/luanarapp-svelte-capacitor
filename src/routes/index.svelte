<script>

   
    
    import {data} from "../stores/storemain"
    import { link } from "svelte-spa-router";
 
    
    let introKeyValue  = "BUTAO-LASC-V1.1.1-introkeyvalue"

  

    let date = new Date();	
	
	let day = date.getDay();

	const arr = $data.courses.map((element) => {
	    return {...element, weekdays: element.weekdays.filter((weekdays) => weekdays.day === day)}
	}).filter((item)=>{ return item.weekdays.length !== 0   })


    const monday = $data.courses.map((monElement)=>{
        return {
            ...monElement,
             monday: monElement.weekdays.filter((wkdElement)=>{
                return wkdElement.day === 1
             })
            }
    }).filter((emptyElement)=>{return emptyElement.monday.length !== 0})

    

	
	const todaycrs = arr.map((element) => {
        let time = ""
		element.weekdays.forEach((weekdays) => time = weekdays.initialTime.substring(0,2));      
		return {...element, time}
	}).sort((a,b)=>{
		return a.time.localeCompare(b.time)
	}).map((item)=>{
		return item
	}) 
    
</script>



<article class="index-section">
    <div class="art-is">
    
        <div class="index-sections">
            <div class="idx-sects">
                <section class="section-one">
                    <article class="sectone">
                        <div class="art-sectone">
                            <div class="upper-sect">
                                <div class="up-sct">
                                    <h1>TODAYS CLASSES</h1>
                                    <p>___</p>
                                </div>
                            </div>
                            <div class="bottom-sect">
                                <div class="bt-sct">
                    
                                    <div class="cards-container">
                                        {#if todaycrs.length === 0}
                                        <div class="card">
                                            <div class="title">
                                                <h1>No Course Avalable For <strong>{date.toLocaleDateString("en-US", {weekday: "long"}).toUpperCase()}</strong></h1>
                                                
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 16 16"><defs><clipPath id="a"><rect width="16" height="16" fill="none"/></clipPath></defs><g clip-path="url(#a)"><path d="M8,0a8,8,0,1,0,8,8A8.024,8.024,0,0,0,8,0ZM9.1,12.2H6.9V10.3H9.2v1.9Zm.1-7.4L8.6,9.2H7.4L6.8,4.8v-1H9.3v1Z" fill="#707070"/></g></svg>
                                            </div>
                                            <div class="txt">
                                                <p>prepare for monday next week</p>
                                            </div>
                                            {#each monday as crs}                                       
                        
                                            <article class="card">
                                                <div class="cd">
                                                    <div class="cd-up-txt">
                                                        <h1>
                                                            <span>monday &hookrightarrow;</span>
                                                            <span>{crs.course}</span>
                                                        </h1>
                                                    </div>
                                                    <div class="cd-lw-txt">
                                                        {#each crs.weekdays as rc}
                                                       
                                                        <hr>
                                                        <table>
                                                            <tbody>
                                                                <tr>
                                                                    <td>from</td>
                                                                    <td>{rc.initialTime}</td>
                                                                    <td>|</td>
                                                                    <td>{rc.location}</td>
                                                                </tr>
                                                              
                                                                ...
                                                            </tbody>
                                                        </table>
                                                        {/each}
                                                    </div>
                                                </div>
                                            </article>
                                            {/each}
                                            
                                
                                        </div>
                                        {/if}

                                        {#each todaycrs as crs}                                       
                    
                                        <a use:link  href="/slug/{crs.code}" class="card">
                                            <div class="cd">
                                                <div class="cd-up-txt">
                                                    <h1>{crs.course}</h1>
                                                </div>
                                                <div class="cd-lw-txt">
                                                    {#each crs.weekdays as rc}
                                                    <div class="flair">
                                                        <p>{rc.type}</p>
                                                    </div>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>{rc.initialTime}</td>
                                                                <td>from</td>
                                                            </tr>
                                                            <tr>
                                                                <td>{rc.finalTime}</td>
                                                                <td>to</td>
                                                            </tr>
                                                            <tr>
                                                                <td>{rc.hours}</td>
                                                                <td>duration</td>
                                                            </tr>
                                                            <tr>
                                                                <td>{rc.location}</td>
                                                                <td>location</td>
                                                            </tr>
                                                            ...
                                                        </tbody>
                                                    </table>
                                                    {/each}
                                                </div>
                                            </div>
                                        </a>
                                        {/each}
                                    </div>
                    
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </div>
    </div>
</article>
<style lang="scss">
    @import "../app.scss";
    .index-section{
        padding-top: 5vh;
        position: relative;
        top:0;
        left: 0;
        .art-is{
            //.index-components
            .index-sections{
                .idx-sects{
                    .section-one{
                        padding: 5vh 1rem;
                        padding-bottom: 10vh;
                        .sectone{
                            .art-sectone{
                                .upper-sect{
                                    text-align: end;
                                    h1{
                                        @include font(var(--tc), 1.2rem, 500);
                                        padding: 1rem 0;
                                    }
                                }
                                .bottom-sect{
                                    .bt-sct{
                                        .cards-container{
                                            .card{
                                                background: var(--l-bl);
                                                border-radius: 4px;
                                                margin: 2rem 0;
                                                padding: 1rem;
                                                box-shadow: #00000050 0 4px 40px 0;
                                                .title{
                                                    display: flex;
                                                    align-items: center;
                                                    justify-content: space-between;
                                                    h1{
                                                        padding: 1rem 0;
                                                        @include font(var(--tc), 1.5rem, 498)

                                                    }
                                                }
                                                .txt{
                                                    p{
                                                        text-align: end;
                                                        @include font(var(--bl), 1.4rem, 495);
                                                        padding: 1rem;
                                                        border-right: var(--bl) 1px solid;
                                                    }
                                                }
                                                .card{
                                                    text-decoration: none;
                                                    display: block;
                                                    background: var(--l-bl);
                                                    border-radius: 4px;
                                                    margin: 2rem 0;
                                                    box-shadow: #0000000f 0 4px 40px 0;
                                                    .cd{
                                                        padding: 1rem;
                                                        h1{
                                                            padding: 1rem 0;
                                                            @include font(var(--tc), 1.3rem, 498)
                                                        }
                                                        tr{
                                                            td{
                                                                padding: 1rem;
                                                                @include font(var(--tc), 1.2rem, 495)
                                                            }
                                                        }
                                                    }
                                                }

                                            }
                                            a{
                                                text-decoration: none;
                                                display: block;
                                                background: var(--l-bl);
                                                border-radius: 4px;
                                                margin: 2rem 0;
                                                box-shadow: #00000050 0 4px 40px 0;
                                                .cd{
                                                    padding: 1rem;
                                                    .cd-up-txt{
                                                        h1{
                                                            padding: 1rem 0;
                                                            @include font(var(--tc), 1.8rem, 498)
                                                        }
                                                        
                                                    }
                                                    .cd-lw-txt{
                                                        .flair{
                                                            text-align: end;
                                                        }
                                                        p{
                                                            display: inline;
                                                            border: var(--flair-bl) solid 1px;
                                                            border-radius: 4rem;
                                                            padding: 0.4rem 1rem;
                                                            letter-spacing: 1px;
                                                            letter-spacing: 1px;
                                                            @include font(var(--tc), 1.2rem, 498)
                                                        }
                                                        table{
                                                            padding: 1rem 0;
                                                            tbody{
                                                                tr{
                                                                    td:nth-child(2){
                                                                        @include font(var(--tc), 1.1rem,495)
                                                                    }
                                                                    td:nth-child(1){
                                                                        padding:0 1rem;
                                                                        @include font(var(--tc), 1.4rem,500)
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
                            }
                        }
                    }
                }
            }
        }
    }
    
</style>