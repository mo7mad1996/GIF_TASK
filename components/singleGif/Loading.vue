<template>
  <div class="loading">
    <svg viewBox="0 0 320 320">
      <defs>
        <!--	for circle	-->
        <radialGradient id="cover" fx="50%" fy="50%" spreadMethod="pad">
          <stop offset="0%" stop-color="rgba(255, 255, 255, 0)" />
          <stop offset="100%" stop-color="rgba(214, 217, 250, 0.8)" />
        </radialGradient>

        <!--	wave Left	-->
        <linearGradient id="a" x1="50%" x2="50%" y1="0%" y2="95.703%">
          <stop offset="0%" stop-color="#f3a5ef"></stop>
          <stop offset="60%" stop-color="#0000ff"></stop>
        </linearGradient>

        <!--	wave Right	-->
        <linearGradient id="b" x1="50%" x2="50%" y1="0%" y2="165.217%">
          <stop offset="0%" stop-color="#0000ff"></stop>
          <stop offset="60%" stop-color="#713189"></stop>
        </linearGradient>

        <!--	Clip-Path	-->
        <clipPath id="glass">
          <circle cx="160" cy="160" r="145" />
        </clipPath>
      </defs>
      <!--	Continear	-->
      <circle
        cx="160"
        cy="160"
        r="150"
        fill="url(#cover)"
        stroke="#d6d9fa"
        stroke-width="10"
      />

      <!--	Waves	-->
      <g style="clip-path: url(#glass)">
        <!--	Left	-->
        <path
          fill="url(#a)"
          d=" 
		M 15,320 L 15,160 
		A 190,320 0 0,1 175,160 
		A 190,320 0 0,0 335,160 
		A 190,320 0 0,1 495,160 
		A 190,320 0 0,0 655,160 
		L 655,320 "
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            attributeType="XML"
            values="0 10;-160 -10;-320 10"
            begin="0s"
            dur="7s"
            repeatCount="indefinite"
          />
        </path>

        <!--	Right	-->
        <path
          fill="url(#b)"
          d="
		M 15,320
		L 15,160
		A 170,320 0 0,0 175,160
		A 170,320 0 0,1 335,160
		A 170,320 0 0,0 495,160
		A 170,320 0 0,1 655,160
		L 655,320
		"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            attributeType="XML"
            values="-320 -10;-160 10;0 -10"
            begin="0s"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      <!--	Shine		-->
      <g>
        <path
          stroke="rgba(255, 255, 255, 0.56)"
          stroke-width="10"
          fill="none"
          stroke-linecap=" round"
          d="
		 	M 90 40
		 	A 90,80 0 0,0 45,80
		 	
		 	M 35 100
		 	A 90,80 0 0,0 28 120
			"
        />
        <path
          fill="rgba(255, 255, 255, 0.56)"
          d="
		 	M 160 15
		 	A 140,140 0 1,1 160,305
		 	A 110,140 0 0,0 160,15
		 "
        />
      </g>
    </svg>

    <h2 class="center-text">Loading...</h2>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style scoped>
.loading {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

svg {
  height: 60%;
  min-height: 100px;
}
</style>
