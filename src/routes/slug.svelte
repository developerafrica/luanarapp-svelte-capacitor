<script>
    export let params = {}


    import {data} from "../stores/storemain"

    
    
    let date = new Date();	
	
	let day = date.getDay();

	const arr = $data.courses.map((element) => {
	return {...element, weekdays: element.weekdays.filter((weekdays) => weekdays.day === day)}
	}).filter((item)=>{ return item.weekdays.length !== 0   })

	
	const todaycrs = arr.map((element) => {
		let time = ""
		element.weekdays.forEach((weekdays) => time = weekdays.initialTime.substring(0,2));      
		return {...element, time}
	}).sort((a,b)=>{
		return a.time.localeCompare(b.time)
	}).map((item)=>{
		return item
	})

    const crsfilter = todaycrs.filter((item)=>{
        return item.code == params.code
    })



</script>

<article class="analytics-section">
    <div class="an-sct">
        <main>
            <div class="mn">
                <div class="cards-view">
                    {#each crsfilter as crs}
                    <div class="card">
                        <div class="cd">
                            <header>
                                <div class="hd">
                                    <h1>{crs.course}</h1>
                                    <div class="details">
                                        <h2>{crs.type}</h2>
                                        <p>{crs.gpa} GPA</p>
                                        <p>{crs.code}</p>
                                    </div>
                                </div>
                            </header>
                            <main>
                                <div class="mn-cd">
                                    {#each crs.weekdays as cr}   
                                        
                                        <div class="details">

                                            <p>{cr.weekday}</p>
                                            <p>{cr.location}</p>
                                            <p>{cr.initialTime} : {cr.finalTime}</p>
                                            <p>{cr.type}</p>
                                            <p>{cr.hours}HRS</p>
                                            
                                        </div>  
                                        <br>                            
                                
                                    {/each}  

                                </div>
                            </main>
                        </div>
                    </div>
                    {/each}
                </div>
            </div>
        </main>
    </div>
</article>



<style lang="scss">
    @import "../app.scss";
    .analytics-section{
        padding: 10vh 1rem;
        background: var(--bg);
        .an-sct{
            main{
                .mn{
                    .cards-view{
                        .card{
                            background: var(--wc);
                            border-radius: 5px;
                            box-shadow: rgba(0, 0, 0, 0.222) 0 4px 4px 0;
                            margin: 1rem 0;
                            .cd{
                                padding: 1rem;
                                header{
                                    .hd{
                                        h1{
                                            @include font(var(--tc), 1.5rem, 500);
                                            text-transform: uppercase;
                                            padding: 0.5rem 0;
                                        }
                                        .details{
                                            padding: 1rem 0;
                                            h2{
                                                @include font(var(--bl), 1.3rem, 500);
                                            }
                                            p{
                                                text-align: end;
                                                padding: 0.8rem 0;
                                                @include font(var(--tc), 1.4rem, 500);
                                            }
                                        }
                                    }
                                }
                                main{
                                    .mn-cd{
                                        .details{
                                            border-left: var(--bl) solid 2px;
                                            padding: 1rem;
                                            
                                            p{
                                                padding: 0.8rem 0;
                                                @include font(var(--tc), 1.3rem, 500);
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
    
    
    