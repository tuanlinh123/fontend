import './home.css'
import React from "react"
import axios from 'axios'
import bannerTeam from '../Home/bannerTeam.PNG'

function Home({user}) {
    // ham nay sau khi render
    const [isLoading, setIsLoading] = React.useState(true);
    const [questions, setQuestions] = React.useState([]);

    const fetchQuestions = async () => {
        setIsLoading(true);

        try {
            const res = await axios({
                url: 'http://localhost:8080/api/questions',
                method: 'GET'
            })
            setIsLoading(false);
            if (res.data.success) {
                setQuestions(res.data.data);
            }
        } catch (err) {
            setIsLoading(false);
        }
    }
    React.useEffect(() => {
        fetchQuestions()
    }, []);

    // const voteQuestion = async (questionId, voteType) => {
    //     console.log('vote question', questionId, voteType)
    //     setQuestions(prevQuetions => {
    //         const valueVoteType = (voteType === "voteUp") ? 1 : - 1
    //         const newQuestions = prevQuetions.map(q => {
    //             if (q._id !== questionId) return q;

    //             return {
    //                 ...q,
    //                 vote: q.vote + valueVoteType
    //             }
    //         })
    //         return newQuestions;
    //     })
    //     const res = await axios({
    //         url: `http://localhost:8080/api/questions/${questionId}/${voteType}`,
    //         method: 'PUT'
    //     })
        
    // }

    const renderQuestions = () => {
        if (isLoading) {
            return <div>Loading...</div>
        }

        return questions.map(q => {

            return (
                <div className='lq-list-item' key={q._id}>
                    <div className='lq-list-item-value'>
                        <div className='lq-list-item-vote'><p>{q.vote}</p><p className='text-votes'>votes</p>
                            {/* <button onClick={() => voteQuestion(q._id, 'voteUp')}>vote up</button>
                            <button onClick={() => voteQuestion(q._id, 'voteDown')}>vote down</button> */}
                        </div>
                        <div className='lq-list-item-vote'><p>{q.answerCount}</p><p className='text-votes'>answers</p></div>
                    </div>
                    <div className='lq-list-item-body'>
                        <div className='lq-list-item-title'><a href={`/question/${q._id}`}><p>{q.title}</p></a></div>
                        <div className='lq-list-item-description'><p>{q.description}</p></div>
                        <div className='lq-list-item-tags'>{renderTags(q.tags)}</div>
                    </div>
                </div>
            )
        })
    }

    const renderTags = (tag) => {
        return tag.map(t => {
            return (
                <button className='tag-button'>{t}</button>
            )
        })
    }
    
    return (
        <div className='home'>
            <div className='header'>
                <a href='#' className='head-logo'><p>MindX Questions</p></a>
                <a href='#' className='head-item head-item-first'><p>About us</p></a>
                <a href='#' className='head-item'><p>Products</p></a>
                <a href='#' className='head-item'><p>For Teams</p></a>
                <form className='head-search-form'>
                    <input className='head-search-input' type={"search"} placeholder="   Search the question"></input>
                </form>
                { user ? (
                    <button className='btn-head login' onClick={() => {
                        localStorage.removeItem('user');
                        window.location.href = '/login'
                    }}>Logout</button>
                ) : (
                    <>
                        <a href='/login' className='head-login'><button className='btn-head login'>Login</button></a>
                        <a href='/signup' className='head-signUp'><button className='btn-head signUp'>Sign up</button></a>
                    </>
                )}
               
            </div>
            <div className='body'>
                <div className='quickAccess'>
                    <ol className='quickAccess-ol'>
                        <li className='qa-home'>
                            <a href='#'>
                                <div className='qa-text'>Home</div>
                            </a>
                        </li>
                        <li className='qa-public'>
                            <ol className='qa-public-ol'>
                                <li className='qa-public-title'>
                                    <div className='qa-text'>PUBLIC</div>
                                </li>
                                <li className='qa-public-item qa-public-item-active'>
                                    <a href='#'>
                                        <div className='qa-text'>Questions</div>
                                    </a>
                                </li>
                                <li className='qa-public-item'>
                                    <a href='#'>
                                        <div className='qa-text'>Tags</div>
                                    </a>
                                </li>
                                <li className='qa-public-item'>
                                    <a href='#'>
                                        <div className='qa-text'>Users</div>
                                    </a>
                                </li>
                                <li className='qa-public-item'>
                                    <a href='#'>
                                        <div className='qa-text'>Companies</div>
                                    </a>
                                </li>
                            </ol>
                        </li>
                        <li>
                           <div className='qa-team'>
                               <div className='qa-team-title'>
                                   <div>Teams</div>
                               </div>
                               <div className='qa-team-dep'>
                                    <div className='qa-team-dep-item1'>
                                        <div className='qa-item1-text-title'>MindX Question Teams</div>
                                        <div className='qa-item1-text-dep'> - Start collaborating and sharing organizational knowledge.</div>
                                    </div>
                                    <div className='qa-team-dep-item2'>
                                        <img className='qa-iteam2-img' src={bannerTeam}></img>
                                    </div>
                                    <div className='qa-team-dep-item3'>
                                        <div className='qa-item3-ab1'>
                                            <button className='qa-item3-btn'>Create a free Team</button>
                                        </div>
                                        <div className='qa-item3-ab2'>
                                            <p className='qa-item3-tex'>Why Teams?</p>
                                        </div>
                                    </div>
                               </div>
                           </div>
                        </li>
                    </ol>
                </div>
                <div className='listQuestion'>
                    <div className='lq-head'>
                        <div className='lq-head-title'><p className='lq-head-title-text'>All Questions</p></div>
                        <div className='lq-head-btn'><a href='/create-question'><button className='lq-head-title-btn'>Ask question?</button></a></div>
                    </div>
                    <div className='lq-nav'>
                        <div className='lq-nav-questionCount'>1332764837 Questions</div>
                        <div className='lq-nav-navbar'>
                            <a href='#' style={{textDecoration: "none"}}>
                                <div className='lq-nav-navbar-item first'>Newest</div>
                            </a>
                            <a href='#' style={{textDecoration: "none"}}>
                                <div className='lq-nav-navbar-item'>Active</div>
                            </a>
                            <a href='#' style={{textDecoration: "none"}}>
                                <div className='lq-nav-navbar-item'>Unanswered</div>
                            </a>
                            <a href='#' style={{textDecoration: "none"}}>
                                <div className='lq-nav-navbar-item'>Most votes</div>
                            </a>
                        </div>
                    </div>
                    <div className='lq-list'>
                        {renderQuestions()}
                    </div>
                </div>

                <div className='advertise'>
                    {/* <img className='ad-img adImg1' src='https://caia.vn/wp-content/uploads/2011/03/quang-cao-truyen-hinh.jpg'></img> */}
                    {/* <img className='ad-img' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNjXcsbOnf7p1dNJpuL7aykwGbZNe3__pA-joOwk5qG3L15gxe8vvuuMLYlgHk76uOaUk&usqp=CAU'></img> */}
                    {/* <img className='ad-img' src='https://vinaad.vn/wp-content/uploads/2018/07/ap-phich-quang-cao-6-e1531123223501.jpg'></img> */}
                    <div className='related-tags'>
                        <div className='rt-title'>
                            Related Tags
                        </div>
                        <div className='rt-list'>
                            <div className='rt-list-item'>
                                <button className='rt-list-item-tag'>javascript</button>
                                <p className='rt-list-item-vl'>x 24064</p>
                            </div>
                            <div className='rt-list-item'>
                                <button className='rt-list-item-tag'>reactJs</button>
                                <p className='rt-list-item-vl'>x 23763</p>
                            </div>
                            <div className='rt-list-item'>
                                <button className='rt-list-item-tag'>python</button>
                                <p className='rt-list-item-vl'>x 19344</p>
                            </div>
                            <div className='rt-list-item'>
                                <button className='rt-list-item-tag'>php</button>
                                <p className='rt-list-item-vl'>x 14864</p>
                            </div>
                            <div className='rt-list-item'>
                                <button className='rt-list-item-tag'>sql</button>
                                <p className='rt-list-item-vl'>x 13954</p>
                            </div>
                            <div className='rt-list-item'>
                                <button className='rt-list-item-tag'>mongodb</button>
                                <p className='rt-list-item-vl'>x 11843</p>
                            </div>
                            <div className='rt-list-item'>
                                <button className='rt-list-item-tag'>database</button>
                                <p className='rt-list-item-vl'>x 10384</p>
                            </div>
                            <div className='rt-list-item'>
                                <button className='rt-list-item-tag'>flask</button>
                                <p className='rt-list-item-vl'>x 8432</p>
                            </div>
                            <div className='rt-list-item'>
                                <button className='rt-list-item-tag'>ruby</button>
                                <p className='rt-list-item-vl'>x 5384</p>
                            </div>
                            <div className='rt-list-item'>
                                <button className='rt-list-item-tag'>facebook</button>
                                <p className='rt-list-item-vl'>x 5163</p>
                            </div>
                            <div className='rt-list-item'>
                                <button className='rt-list-item-tag'>google</button>
                                <p className='rt-list-item-vl'>x 5023</p>
                            </div>
                            <div className='rt-list-item'>
                                <button className='rt-list-item-tag'>postgres</button>
                                <p className='rt-list-item-vl'>x 4936</p>
                            </div>
                            <div className='rt-list-item'>
                                <button className='rt-list-item-tag'>ddos</button>
                                <p className='rt-list-item-vl'>x 4773</p>
                            </div>
                            <div className='rt-list-item'>
                                <button className='rt-list-item-tag'>AI</button>
                                <p className='rt-list-item-vl'>x 2543</p>
                            </div>
                            <div className='rt-list-item'>
                                <button className='rt-list-item-tag'>vsCode</button>
                                <p className='rt-list-item-vl'>x 1834</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <footer className='footer'>
                <div className='ft-item1'>
                    <div className='ft-logo'>MINDX QUESTIONS</div>
                    <div className='ft-text-dep'>Questions</div>
                    <div className='ft-text-dep'>Help</div>
                </div>
                <div className='ft-item2'>
                    <div className='ft-text-title'>PRODUCTS</div>
                    <div className='ft-text-dep'>Teams</div>
                    <div className='ft-text-dep'>Advertising</div>
                    <div className='ft-text-dep'>Collectives</div>
                    <div className='ft-text-dep'>Talent</div>
                </div>
                <div className='ft-item3'>
                    <div className='ft-text-title'>COMPANY</div>
                    <div className='ft-text-dep'>About</div>
                    <div className='ft-text-dep'>Press</div>
                    <div className='ft-text-dep'>Work Here</div>
                    <div className='ft-text-dep'>Legal</div>
                    <div className='ft-text-dep'>Privacy Policy</div>
                    <div className='ft-text-dep'>Terms of Service</div>
                    <div className='ft-text-dep'>Contact Us</div>
                    <div className='ft-text-dep'>Cookie Settings</div>
                    <div className='ft-text-dep'>Cookie Policy</div>
                </div>
                <div className='ft-item4'>
                    <div className='ft-text-title'>STACK EXCHANGE NETWORK</div>
                    <div className='ft-text-dep'>Technology</div>
                    <div className='ft-text-dep'>Culture & recreation</div>
                    <div className='ft-text-dep'>Life & arts</div>
                    <div className='ft-text-dep'>Science</div>
                    <div className='ft-text-dep'>Professional</div>
                    <div className='ft-text-dep'>Business</div>
                    <div className='ft-text-dep'>API</div>
                    <div className='ft-text-dep'>Data</div>
                </div>
                <div className='ft-item5'>
                    <div className='ft-item5-up'>
                        <div className='ft-text-dep ft-item5-tag'>Blog</div>
                        <div className='ft-text-dep ft-item5-tag'>Facebook</div>
                        <div className='ft-text-dep ft-item5-tag'>Twitter</div>
                        <div className='ft-text-dep ft-item5-tag'>LinkedIn</div>
                        <div className='ft-text-dep ft-item5-tag'>Instagram</div>
                    </div>
                    <div className='ft-item5-down'>
                        <div className='ft-item5-down-dep'>
                        Site design / logo © 2022 Stack Exchange Inc; user<br></br> contributions
                         licensed under cc by-sa. rev 2022.6.8.42312
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home