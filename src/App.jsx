import { useState, useEffect } from 'react';
import SearchIcon from './assets/search.png';
import background ,{gradient}from './background';
import { shuffle } from 'lodash';
import cloud_icon from  './assets/cloud.png';
import clear_icon from './assets/clear.png';
import drizzle_icon from  './assets/drizzle.png';
import humidity_icon from './assets/humidity_weather.png';
import rain_icon from  './assets/rain.png';
import snow_icon from './assets/snow.png';
import wind_icon from  './assets/wind_weather.png';

export default function App() {
	const [loading,setLoading] = useState(true);
	const [error,setError] = useState(null)
	const [trigger,setTrigger]= useState(false);
	const [search, setSearch] = useState('mangalore');
	const [info, setInfo] = useState({});
	const [grad, setgrad] = useState(null);
	const [wicon,setWicon] = useState(cloud_icon);
	// const [CtoF, setCtoF] =useState({});
	const [sButton, setSButton] = useState(search);


	
	function handleButtonClick() {
		setSButton(search);
		setTrigger(true);

	}
	function handleKeyPress(e) {
		if (e.key === 'Enter') handleButtonClick();
	}

	function handleSearch(e) {
		setSearch(e.target.value);
	}

	
	useEffect(() => {
		

		async function getData() {
			setLoading(true)
			setError(null)
			try{
				await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${sButton}&units=metric&appid=cc4b81340e1da9db4075ef6adca38802`
				// `https://api.weatherapi.com/v1/forecast.json?key=f676e0d30686474d99b160351221104&q=${search}&days=1&aqi=no&alerts=no`
			)
				.then((r) => r.json())
				.then((d) => {
					setInfo({
						message:d.message,
						name:d.name,
						weather:d.weather[0].main,
						description:d.weather[0].description,
						humidity:d.main.humidity,
						wind:d.wind.speed,
						icon:d.weather[0].icon,
						temp:{
							current:d.main.temp,
							min: d.main.temp_min,
							max: d.main.temp_max,
						},
					});
					

				
					
				}
				)
			}catch(error){
				setError(error)
				console.log({error})
			}

			(info.weather?.toLowerCase() === 'clear' || info.icon ==="01d" || info.icon === "01n")
				? setWicon(clear_icon)
				: (info.weather?.toLowerCase() === 'sunny' || info.icon ==="01d" || info.icon === "01n")
				? setWicon(clear_icon)
				: (info.weather?.toLowerCase()==='clouds'|| info.weather?.toLowerCase()==='smoke' || info.icon ==="02d" || info.icon === "02n")
				? setWicon(cloud_icon)
				: (info.weather?.toLowerCase()==='drizzle'|| info.weather?.toLowerCase()==='mist' || info.icon ==="03d" || info.icon === "03n" )
				? setWicon(drizzle_icon)
				: (info.weather?.toLowerCase()==='snow' ||
					info.weather?.toLowerCase()==='sleet' || info.icon ==="13d" || info.icon === "13n" )
				? setWicon(snow_icon) 
				:(info.weather?.toLowerCase()==='rain'||info.icon ==="09d" || info.icon === "09n")
				? setWicon(rain_icon): setWicon(clear_icon);

			setLoading(false)
		}
	
		if(trigger){
			getData()
		}

	}, [sButton,wicon,info.weather,info.icon]);

	useEffect(() => {
		setgrad(shuffle(gradient).pop());
	}, []);

					
	

	return (
		<div
			style={
				(info.weather?.toLowerCase() === 'clear' || info.icon ==="01d" || info.icon === "01n")
					? { backgroundImage: background.clear}
					: (info.weather?.toLowerCase() === 'sunny' || info.icon ==="01d" || info.icon === "01n")
					? { backgroundImage: background.sunny }
					: (info.weather?.toLowerCase().includes('clouds') || info.icon ==="02d" || info.icon === "02n")
					? { backgroundImage: background.cloudy }
					: (info.weather?.toLowerCase().includes('drizzle') || info.icon ==="03d" || info.icon === "03n" )
					? { backgroundImage: background.rainy }
					: (info.weather?.toLowerCase().includes('snow') ||
					  info.weather?.toLowerCase().includes('sleet') || info.icon ==="13d" || info.icon === "13n" )
					? { backgroundImage: background.snow  }
					:(info.weather?.toLowerCase().includes('rain')||info.icon ==="09d" || info.icon === "09n")
					? { backgroundImage: background.rainy }
					: info.weather?.toLowerCase().includes('overcast')
					? { backgroundImage: background.overcast }
					: { backgroundImage: grad }
			}
			className='flex flex-row  text-black items-center justify-center h-screen bg-center bg-cover select-none'
		>
			<div>
				<div className='flex justify-center' >
					<img src={wicon} alt="" className="" />
				</div>
				<div className='flex flex-row h-10 my-10 justify-center'>
					<input
						className='bg-transparent placeholder:text-black text-lg focus:outline-none border-transparent focus:border-transparent focus:ring-0 sm:text-xl font-light self-end mb-1 mr-10'
						type='text'
						spellCheck='false'
						value={search}
						placeholder='please enter location'
						onChange={handleSearch}
						onFocus={(e) => (e.target.placeholder = '')}
						onBlur={(e) =>
							(e.target.placeholder = 'please enter location')
						}
						onKeyPress={handleKeyPress}
					/>

					<div className='self-end mb-1  '>
						<img src={SearchIcon}
							className='cursor-pointer h-6 sm:h-7 opacity-70'
							onClick={handleButtonClick}
						/>
					</div>
				</div>

				{(info.temp && !error )?(
					<div className='grid overflow-hidden grid-cols-2 grid-rows-2 gap-10 sm:gap-10 sm:grid-cols-2  sm:mr-0 mr-4'>
					<div className='row-span-2 justify-self-end'>
							<p className='text-end sm:text-9xl text-7xl font-light tracking-tighter' id="CurrentTemp">
								{Math.floor(info.temp.current)}
								<span className=' align-top  text-lg sm:font-light font-normal sm:text-3xl tracking-wide '>
									°C 
								</span>
							</p>
					</div>
					<div className='row-span-2 justify-self-center'>
						<div className='  sm:mt-3 mt-2   '>
							<p className=' text-start sm:text-2xl font-light sm:pb-1 sm:ml-1'>
								<span>{info.weather}</span>
							</p>					
						</div>
						<div className='row-span-2  sm:mt-3 mt-2  justify-self-center '>
								<div className='sm:text-xl  text-start font-light'>
									<div className='flex flex-row gap-10'>
										<div className=''>
											<p className=''>Humidity</p>
											<div className='flex'>
												<img src={humidity_icon} className='h-8 sm:h-6 xs:h-4' alt=""/>
												<span>{info.humidity} {''} %</span>
											</div>
										</div>
										<div className=''>
											<p>Wind</p>
											<div className='flex'>
												<img src={wind_icon} className='h-8 sm:h-6' alt="" />
												<span>{info.humidity} {''} km/h</span>
											</div>
										</div>
								</div>
								</div>

							<p className='sm:text-xl  text-start font-light  whitespace-nowrap  sm:mt-1 sm:ml-1'>
								{info.name}
							</p>

							
						</div>
					</div>
					</div>

				):(error)?(<div>city not found</div>):null
				}
				
			</div>
			
		</div>
	);
}
