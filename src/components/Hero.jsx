import { useGSAP } from "@gsap/react"
import { SplitText } from "gsap/all"
import gsap from "gsap"
import { useRef } from "react"
import { useMediaQuery } from "react-responsive"


const Hero = () => {
    const videoRef = useRef()
    const isMobile = useMediaQuery({maxWidth: 767})


    useGSAP(() => {
        const heroSplit = new SplitText(".title", {type: 'chars, words'});
        const paragraphSplit = new SplitText(".subtitle", {type: 'lines'})

        heroSplit.chars.forEach((char) => char.classList.add("text-gradient"))

        gsap.from(heroSplit.chars, {
            yPercent: 100,
            duration: 2,
            ease: "expo.out",
            stagger: 0.05,
        })

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            duration: 2,
            yPercent: 100,
            ease: "expo.out",
            stagger: 0.05,
            delay: 1,
        })

        gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        })
        .to('.right-leaf', {y: 300}, 0)
        .to('.left-leaf', {y: -300}, 0)


        const startValue = isMobile ? 'top 50%' : "center 60%";
        const endValue = isMobile ? '120% top': 'bottom top';

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "video",
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            }
        })


        videoRef.current.onloadedmetadata = () => {
            tl.to(videoRef.current, {
                currentTime: videoRef.current.duration
            })
        }

    }, [])
  return (
    <>
        <section id="hero" className="noisy">
            <h1 className="title">Mojito</h1>
            <img src="/images/hero-left-leaf.png" alt="left leaf" className="left-leaf"/>
            <img src="/images/hero-right-leaf.png" alt="right leaf" className="right-leaf"/>

            <div className="body">
                <div className="content">
                    <div className="space-y-5 hidden md:block">
                        <p>Cool. Ice. Classy</p>
                        <p className="subtitle">
                            Sip the refreshing taste of Summer
                        </p>
                    </div>

                    <div className="view-cocktails">
                        <p className="subtitle">
                            Every sip is a journey to paradise, where the coolness of mint meets the zesty lime, creating a symphony of flavors that dance on your palate. - Designed to tingle your eyes
                        </p>
                        <a href="#cocktails">View cocktails</a>
                    </div>
                </div>
            </div>
        </section>

        <div className="video absolute inset-0">
            <video 
            ref={videoRef}
            className=""
            src="/videos/output.mp4"
            muted
            playsInline
            preload="auto"
            />
        </div>
    </>
  )
}

export default Hero
