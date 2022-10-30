<script>
    import {data} from "../stores/storemain.js"
    
    let core  = $data.courses.filter((items)=>{
        return items.type == "CORE"
    })
    let len = core.length
        
    
    </script>
<article class="analytics-section">
    <div class="an-sct">

        <header class="head-top">
            <div class="hd">
                {#each $data.common as cmn}
                <div class="up-hd-txt">
                    <table>
                        <tr>
                           
                            <td>
                                <h1> {cmn.programme}</h1>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h1>year </h1>
                            </td>
                            <td>
                                <h1>: { cmn.studyYear}</h1>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h1>semester </h1>
                            </td>
                            <td>
                                <h1>: {cmn.semester}</h1>
                            </td>
                        </tr>
                    </table>
                </div>   
                <div class="lw-hd-txt">
                    <p>programme summary</p>
                    <ul>
                        <li>{$data.courses.length} COURSES</li>
                        <li>{len} CORES</li>
                    </ul>
                </div>             
                {/each}
            </div>
        </header>
        <main>
            <div class="mn">
                <div class="cards-view">
                    {#each $data.courses as crs}
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
        .an-sct{
            .head-top{
                background: var(--wc);
                box-shadow: rgba(0, 0, 0, 0.309) 1px 4px 4px 3px;
                border-radius: 4px;
                margin: 1rem 0;
                .hd{
                    padding: 1rem;
                    text-transform: uppercase;
                    .up-hd-txt{
                        h1{
                            @include font(var(--tc), 1.3rem, 495);
                            padding: 0.5rem 0;
                        }
                        h1:nth-child(1){
                            margin: 10px;
                        }
                    }
                    .lw-hd-txt{
                        text-align: end;
                        p{
                            @include font(var(--bl), 1.1rem, 495);
                            padding: 0.5rem 0;
                        }
                        ul{
                            list-style: none;
                            li{
                                padding: 0.5rem 0;
                                @include font(var(--tc), 1.3rem, 495)

                            }
                        }
                    }
                }
            }
            main{
                .mn{
                    .cards-view{
                        .card{
                            background: var(--l-bl);
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
                                            h2{
                                                @include font(var(--bl), 1.3rem, 500);
                                            }
                                            p{
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