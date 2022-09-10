import './Question.css'
import React from 'react'
import axios, { Axios } from 'axios'
import { useParams } from 'react-router-dom'

function Question({ user }) {
	
	const navbarHandle = () =>
		document.querySelector('.offcanvas-collapse').classList.toggle('open')
	let [answer, setAnswer] = React.useState(),
		[keyword, setKeyword] = React.useState(''),
		[description, setDescription] = React.useState('')

	let [questions, setQuestion] = React.useState()
	const { id: questionId } = useParams()

	const filterHandle = (e) => {
		setKeyword(e.target.value)
	}

	// gọi questions
	React.useEffect(() => {
		const getData = async () => {
			let dataQuestion = await axios.get(
				'http://localhost:8080/api/questions/' + questionId
			)
			setQuestion(dataQuestion.data.data)
			console.log(dataQuestion)
			console.log('aksjssj')
		}
		getData()
	}, [questionId])
	// goi answer
	React.useEffect(() => {
		const getData = async () => {
			let dataAnswer = await axios.get(
				`http://localhost:8080/api/answers?questionId=${questionId}`
			)
			setAnswer(dataAnswer.data.data)
			console.log(dataAnswer.data.data)
			console.log('aksjssj')
		}
		getData()
	}, [])


	const postDate = async (e) => {
		e.preventDefault()
		await axios
			.post(
				`http://localhost:8080/api/answers?questionId=${questionId}`,
				{
					description,
					userId:user.username
					
				}
			)
			.then((res) => {
				const getData = async () => {
					let NewDataAnswer = await axios.get(
						`http://localhost:8080/api/answers?questionId=${questionId}`
					)
					setAnswer(NewDataAnswer.data.data)
					console.log(answer)
					console.log(user.username);
				}
				getData()
			})
			.catch((err) => console.log(err))
	}
	React.useEffect(() => {
		const getData = async () => {
			let dataAnswer = await axios.get(
				`http://localhost:8080/api/answers?questionId=${questionId}`
			)
			setAnswer(dataAnswer.data.data)
			console.log(dataAnswer.data.data)
			console.log('aksjssj')
		}
		getData()
	}, [keyword])
	return (
		<>
	
			<nav
				className="navbar navbar-expand-lg fixed-top navbar-dark bgdark"
				aria-label="Main navigation"
			>
				
				<div className="container-fluid">
					<a className="navbar-brand" href="#">
						Question & Anwser
					</a>
					<button
						className="navbar-toggler p-0 border-0"
						type="button"
						id="navbarSideCollapse"
						aria-label="Toggle navigation"
						onClick={() => {
							navbarHandle()
						}}
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div
						className="navbar-collapse offcanvas-collapse"
						id="navbarsExampleDefault"
					>
						<form className="d-flex" role="search">
							<input
								className="form-control me-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
								onInput={(event) => {
									filterHandle(event)
								}}
							/>
							<button
								className="btn btn-outline-success"
								type="submit"
							>
								Search
							</button>
						</form>
					</div>
				</div>
				
			</nav>
			<div className="container1">
				<div className="containerExtra">
					<a href='../'><button type="button" className="btn btn-light">
						Home
					</button></a>
					<a href='../create-question'><button type="button" className="btn btn-primary">
						Ask Question
					</button></a>
					{/* <button type="button" className="btn btn-primary">
						About Us
					</button> */}
				</div>
				<main className="container mid">
					<div className="d-flex align-items-center question my-3 text-white bg-purple rounded shadow-sm">
						{/* <img className="me-3" src="../assets/brand/bootstrap-logo-white.svg" alt="" width="48" height="38"></img> */}
						<div className="lh-1">
							<small>
								<ul className="questionData">
									{questions && (
										<div>
											<div className="titleSmall">
												<h3>
													<span>Titel</span>
													<spam className="titelTQues">
														{questions.title}
													</spam>
												</h3>
											</div>

											<span className="textQuestion">
												Question :
											</span>
											<span>{questions.description}</span>
										</div>
									)}
								</ul>
							</small>
						</div>
					</div>

					<div>
						{answer &&
							answer.map((item) => {
								if (
									
									(item.description.toLowerCase()
									.includes(keyword.toLowerCase().trim()))
									// item.description != undefined
								) 
							
									return (
										<div className="my-3  bg-body rounded shadow-sm">
											<div className="d-flex text-muted pt-3">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="40"
													height="40"
													fill="currentColor"
													className="bi bi-person-circle"
													viewBox="0 0 16 16"
												>
													<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
													<path
														fill-rule="evenodd"
														d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
													/>
												</svg>
												<strong className="text-gray-dark">
													{item.userId}
												</strong>
												<div className=" mb-0 answerApi small lh-sm border-bottom w-100">
													<div className="d-flex justify-content-between"></div>
													<span className="d-block">
														{' '}
														<div key={item.id}>
															{/* description:{' '} */}
															{item.description}
														</div>
													</span>
													<a className="date">
														vote {item.vote}
													</a>
												</div>
											</div>
										</div>
									)
									})}
						<div className="input-group mb-3">
							<div className="input-group-prepend">
								<button
									className="btn btn-outline-secondary"
									type="button"
									onClick={postDate}
								>
									Anwser
								</button>
							</div>
							<input
								type="text"
								className=" inputCre"
								aria-describedby="basic-addon1"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></input>
						</div>
					</div>
				</main>
			
			</div>

			<link
				href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
				rel="stylesheet"
				id="bootstrap-css"
			></link>
			<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
			<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

			<section id="footer">
				<div className="container">
					<div className="row text-center text-xs-center text-sm-left text-md-left">
						<div className="col-xs-12 col-sm-4 col-md-4">
							<h5>Quick links</h5>
							<ul className="list-unstyled quick-links">
								<li>
									<a href="javascript:void();">
										<i className="fa fa-angle-double-right"></i>
										Home
									</a>
								</li>
								<li>
									<a href="javascript:void();">
										<i className="fa fa-angle-double-right"></i>
										About
									</a>
								</li>
								<li>
									<a href="javascript:void();">
										<i className="fa fa-angle-double-right"></i>
										FAQ
									</a>
								</li>
							</ul>
						</div>
						<div className="col-xs-12 col-sm-4 col-md-4">
							<h5>Quick links</h5>
							<ul className="list-unstyled quick-links">
								<li>
									<a href="javascript:void();">
										<i className="fa fa-angle-double-right"></i>
										Home
									</a>
								</li>
								<li>
									<a href="javascript:void();">
										<i className="fa fa-angle-double-right"></i>
										About
									</a>
								</li>
								<li>
									<a href="javascript:void();">
										<i className="fa fa-angle-double-right"></i>
										FAQ
									</a>
								</li>
							</ul>
						</div>
						<div className="col-xs-12 col-sm-4 col-md-4">
							<h5>Quick links</h5>
							<ul className="list-unstyled quick-links">
								<li>
									<a href="javascript:void();">
										<i className="fa fa-angle-double-right"></i>
										Home
									</a>
								</li>
								<li>
									<a href="javascript:void();">
										<i className="fa fa-angle-double-right"></i>
										About
									</a>
								</li>
								<li>
									<a href="javascript:void();">
										<i className="fa fa-angle-double-right"></i>
										FAQ
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
							<ul className="list-unstyled list-inline social text-center">
								<li className="list-inline-item">
									<a href="javascript:void();">
										<i className="fa fa-facebook"></i>
									</a>
								</li>
								<li className="list-inline-item">
									<a href="javascript:void();">
										<i className="fa fa-twitter"></i>
									</a>
								</li>
								<li className="list-inline-item">
									<a href="javascript:void();">
										<i className="fa fa-instagram"></i>
									</a>
								</li>
								<li className="list-inline-item">
									<a href="javascript:void();">
										<i className="fa fa-google-plus"></i>
									</a>
								</li>
								<li className="list-inline-item">
									<a
										href="javascript:void();"
										target="_blank"
									>
										<i className="fa fa-envelope"></i>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
							<p>
								<u>
									<a href="https://www.nationaltransaction.com/">
										National Transaction Corporation
									</a>
								</u>{' '}
								is a Registered MSP/ISO of Elavon, Inc. Georgia
								[a wholly owned subsidiary of U.S. Bancorp,
								Minneapolis, MN]
							</p>
							<p className="h6">
								&copy All right Reversed.
								<a
									className="text-green ml-2"
									href="https://www.sunlimetech.com"
									target="_blank"
								>
									Sunlimetech
								</a>
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

export default Question