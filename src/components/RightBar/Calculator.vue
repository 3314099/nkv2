<template>
  <div>
    <v-card>
      <div class="container">
        <div
          class='item input1 height'
          readonly
          @click="checkToClipboardNum(display)"
        >{{display1}}
        </div>
        <div
          class='item sign height'
          readonly
        >{{signDisplay}}
        </div>
        <div
          class='item input2 height'
          readonly
          @click="checkToClipboardNum(display)"
        >{{display2}}
        </div>
        <div class="item clean height" @click="clean()">C</div>
        <div class="item height" @click="fromClipBoard(copiedToClipboard)">
          &uArr;</div>
        <div class="item back height" @click="back()">&larr;</div>
        <!-- <div class="item height" @click="ceil()">&uarr; 0</div>
        <div class="item height" @click="flor()">&darr; 0</div>
        <div class="item height" @click="sign()">+/-</div>
        <div class="item height" @click="procent('/100')">%</div> -->
        <div class="item height" @click="incert('+')">+</div>
        <div class="item height" @click="incert('-')">-</div>
        <div class="item height" @click="incert('*')">&times;</div>
        <div class="item height" @click="incert('/')">&divide;</div>
        <div class="item height" @click="incertNum('7')">7</div>
        <div class="item height" @click="incertNum('8')">8</div>
        <div class="item height" @click="incertNum('9')">9</div>
        <div class="item height" @click="procent()">%</div>
        <div class="item height" @click="incertNum('4')">4</div>
        <div class="item height" @click="incertNum('5')">5</div>
        <div class="item height" @click="incertNum('6')">6</div>
        <div class="item height" @click="sign()">+/-</div>
        <div class="item height" @click="incertNum('1')">1</div>
        <div class="item height" @click="incertNum('2')">2</div>
        <div class="item height" @click="incertNum('3')">3</div>
        <div class="item equal" @click="equal(0)">=</div>
        <div class="item zero height" @click="incertZero()">0</div>
        <div class="item height" @click="incertDoubleZero()">00</div>
        <div class="item height" @click="incertDot()">.</div>
      </div>
    </v-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      display1: '',
      display2: '',
      signDisplay: ''
    }
  },
  computed: {
    copiedToClipboard () {
      return this.$store.getters.computedCopiedToClipboard
    }
  },
  methods: {
    clean () {
      this.display1 = ''
      this.display2 = ''
      this.signDisplay = ''
    },
    fromClipBoard (val) {
      if (!isNaN(val)) {
        this.display2 = val.toString()
      } else {
        this.$store.dispatch('changeSnackBar', {
          timeout: 1000,
          text: 'Значение должно быть числом!!!',
          color: 'red lighten-1'
        })
      }
    },
    back () {
      this.display2 = this.display2.substring(0, (this.display2.toString()).length - 1)
    },
    ceil () {
      if (!this.booldisplay && this.operator === false) {
        // eslint-disable-next-line no-eval
        this.display = eval(Math.ceil(this.display).toString()).toString()
      }
    },
    flor () {
      if (!this.booldisplay && this.operator === false) {
        // eslint-disable-next-line no-eval
        this.display = eval((Math.floor(this.display)).toString()).toString()
      }
    },
    sign: function () {
      if (this.display2 !== '') {
        // eslint-disable-next-line no-eval
        this.display2 = (eval(this.display2) * (-1)).toString()
      }
    },
    procent () {
      if (this.dislay1 !== '' && this.display2 !== '' && this.signDisplay !== '') {
        if (this.signDisplay === '-' || this.signDisplay === '+') {
          const sum = this.display1 * this.display2 / 100
          // eslint-disable-next-line no-eval
          this.display1 = (eval(this.display1 + this.signDisplay + sum)
            .toFixed(2)).toString()
        } else if (this.signDisplay === '*') {
          // eslint-disable-next-line no-eval
          this.display1 = ((eval(this.display1 * this.display2) / 100)
            .toFixed(2)).toString()
        } else {
          // eslint-disable-next-line no-eval
          this.display1 = ((eval(this.display1 * 100 / this.display2))
            .toFixed(2)).toString()
        }
        this.display2 = ''
        this.signDisplay = ''
      }
    },
    incert (num) {
      if ((this.display2 === '' && this.display1 === '') || (this.display2 === '0.')) {
        this.signDisplay = ''
      } else {
        if (this.display2 !== '' && this.display1 !== '') {
          // eslint-disable-next-line no-eval
          this.display1 = (eval(this.display1 + num.toString() + this.display2).toFixed(2)).toString()
          this.display2 = ''
          this.signDisplay = num.toString()
        } else if (this.display2 !== '' && this.display1 === '') {
          this.signDisplay = num.toString()
          this.display1 = this.display2
          this.display2 = ''
        } else {
          this.signDisplay = num.toString()
        }
      }
    },
    incertNum (num) {
      console.log(this.display1 !== '' && this.signDisplay === '')
      if (!(this.display1 !== '' && this.signDisplay === '')) {
        if (this.display2.length < 14) {
          this.display2 = this.display2.toString() + num.toString()
        }
      }
    },
    incertZero () {
      if (this.display2 === '') {
        this.display2 = '0.'
      } else {
        this.display2 = this.display2 + '0'
      }
    },
    incertDoubleZero () {
      if (this.display2 === '') {
        this.display2 = '0.'
      } else {
        this.display2 = this.display2 + '00'
      }
    },
    incertDot () {
      if (this.display2 !== '' && this.display2.indexOf('.') === -1) {
        this.display2 = this.display2 + '.'
      }
    },
    equal () {
      if (this.display2 !== '' && this.display1 !== '') {
        // eslint-disable-next-line no-eval
        this.display1 = (eval(this.display1 + this.signDisplay + this.display2)
          .toFixed(2)).toString()
        this.display2 = ''
        this.signDisplay = ''
      }
    }

  }
}

</script>

<style scoped>
  body
  {
    user-select: none;
  }

  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 2px;
    background-color: #212121;
    padding: 2px;
    border-radius: 5px;
    max-width: 360px;
    font-family: Tahoma,serif;
    user-select: none
  }

  .item {
    background-color: #BBDEFB;
    color: black;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    cursor: pointer;
    font-weight: bold;
  }

  form {
    max-width: 100%;
  }
  input {
    width: 100%;
    height: 45px;
    border: none;
    font-size: 30px;
    outline: none;
    text-align: left;
  }
  .input1 {
    grid-column: 1/-1;
    padding: 0;
  }
  .input2 {
    grid-column: 2/-1;
    padding: 0;
  }
  .sign {
    grid-column: 1;
    padding: 0;
  }
  .clean {
    background-color: #2979FF;
  }
  .back {
    grid-column: 3/-1;
  }
  .equal {
    grid-column: 4;
    grid-row: 7/9;
    background-color: #2979FF;
  }
  .zero {
    grid-column: 1/2;
  }
  .height {
    height: 45px;
  }

</style>
