<template>
  <div >
    <div class="d-none d-md-none d-lg-flex d-xl-flex">
      <v-window
        style="width: 100%"
        v-model="win"
      >
        <v-window-item>
          <h1>MainPagePreloader</h1>
        </v-window-item>
        <v-window-item>
          <div class="d-flex flex-grow-1 justify-space-between">
            <div class="justify-start">
            <LeftBar/>
            </div>
            <div style="width: 100%">
            <ContentArea
              class="d-flex flex-grow-1 justify-center mr-3"
            />
            </div>
            <div class="d-flex justify-end">
            <RightBar/>
            </div>
          </div>
        </v-window-item>
        <v-window-item>
          <div class="d-flex justify-space-between">
            LC
            <LeftBar/>
            <ContentArea/>
          </div>
        </v-window-item>
        <v-window-item>
          <div class="d-flex justify-space-between">
            <ContentArea/>
            <RightBar/>
          </div>
        </v-window-item>
        <v-window-item>
          <div class="d-flex justify-space-between">
          <ContentArea/>
          </div>
        </v-window-item>
      </v-window>
    </div>
    <div class="d-lg-none d-xl-none"><h1>Medium</h1>
      <v-window
        v-model="win"
        class="elevation-1"
      >
        <v-window-item>
          <v-card color="grey">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas accusantium, assumenda quae dignissimos dolor totam rerum repudiandae sunt ducimus alias. Accusamus labore quisquam ipsa atque non libero consequatur perferendis! Explicabo unde, reprehenderit obcaecati porro facere libero cum cumque consectetur dolore. Illo voluptates minus perspiciatis, amet ad voluptatibus laudantium architecto facilis natus dolorum, sunt temporibus error iusto aliquam similique doloribus impedit dolorem et ex culpa pariatur ipsa necessitatibus nemo sapiente! Eum, ratione hic quasi ipsam molestias quis, libero magnam velit vel, dolore cum repellat. Dolorum a dicta laborum in fugit, incidunt tempora, praesentium ullam est nobis vitae sapiente perspiciatis aliquam dolore!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi reiciendis quas eaque! Eveniet, minima ducimus incidunt ipsam eaque odio, ipsum est deleniti dolor libero possimus voluptatem. Animi maiores beatae ex. Commodi sed repellat iusto. Sint corporis repudiandae amet recusandae quis, harum corrupti, dolor error dicta labore facere adipisci blanditiis hic molestiae quos itaque id aliquid ab excepturi nemo accusantium atque at fuga ipsam. Blanditiis quia repellat in tempora fuga quod, quos amet ratione, aperiam nam doloribus eos quasi deleniti, animi laborum possimus facere? Totam laborum doloribus fuga pariatur. Modi hic tempora, deserunt nemo omnis reprehenderit facere animi eligendi necessitatibus id consequatur vel! Soluta provident fuga enim totam nostrum, sed illo ipsa quam ullam? Quod dolorem vitae quo voluptates deleniti facilis suscipit asperiores doloremque voluptatem enim. Fugiat, ex libero? Corporis a tempore, expedita illum, repudiandae explicabo similique sunt eos doloremque eum dolore mollitia non? Libero quam nulla nam tempore assumenda pariatur aliquid corporis sequi architecto iste debitis quos ut possimus, similique perspiciatis iusto impedit cum fugit iure expedita? Nobis tenetur doloribus sit maiores aperiam? Quae, perferendis quod. Dicta molestiae eligendi laboriosam quae? Nesciunt in inventore sit cupiditate eveniet veniam porro odio? Dolor perferendis velit odio similique perspiciatis accusantium ipsum, quae omnis. Placeat nihil fugit rem nostrum quos. Perspiciatis possimus cupiditate velit illo expedita, maxime rerum officiis labore minima fugiat nemo voluptates veritatis quisquam consequatur sint ipsum, quo, cumque iusto esse obcaecati accusamus quibusdam deserunt neque nihil. Deserunt maiores architecto similique, explicabo, distinctio accusantium repudiandae ad officiis laborum delectus veniam amet alias enim ullam vitae illo quisquam? Iure esse natus dolore velit laboriosam ex! Commodi reprehenderit accusamus incidunt sunt excepturi inventore sed cupiditate at odio ex suscipit obcaecati velit sequi quibusdam, explicabo itaque ullam temporibus porro nemo, harum deserunt iusto quia earum aperiam. Repudiandae explicabo adipisci corporis pariatur! Nihil, sequi dolores labore eaque necessitatibus aspernatur accusamus saepe rerum nulla quas deleniti enim ipsum iure facere minus! Dolores ex hic facere veritatis sint. Asperiores vero dolorum alias quod, aliquam distinctio consequatur tempora necessitatibus dolores, fugit, porro quaerat? Pariatur nostrum doloremque ipsum earum quod nesciunt quae consequuntur dolorem? Soluta ducimus itaque nihil, quae aliquam harum porro? Accusantium at totam quas impedit quos natus. Ex atque quis veniam maiores aut libero est doloribus repellendus quasi incidunt nulla quibusdam voluptatibus animi, enim sapiente velit dolor, ad facere, asperiores corrupti praesentium. Magnam, hic sit! Eos officia nobis expedita provident fugiat laudantium? Ab quis voluptatem modi, porro amet debitis minus recusandae iure ratione, nemo quam. Quisquam aliquam rerum, earum aut excepturi id, officia tempore minus ad commodi iure rem saepe sunt voluptas quod? Laudantium consectetur blanditiis provident error modi ullam non inventore repudiandae fugit esse ea nam laborum voluptatum, nihil eius a fuga aliquid eveniet omnis neque totam labore aut. Dolorum, minima ad dolores, mollitia expedita est adipisci assumenda quidem corporis dolore ipsum perferendis similique tempore reprehenderit molestiae dolor! Magnam ipsam ipsa quod modi dicta, reprehenderit fuga adipisci ad eligendi unde eaque omnis a nisi et qui quidem delectus! Voluptas ducimus hic vitae inventore libero aliquam totam accusantium molestiae aspernatur explicabo odio veniam tempora illum quibusdam dolores saepe ratione, ea labore odit officiis enim, eius suscipit reprehenderit. Expedita quibusdam consequuntur labore aliquid cum consectetur, tempora quae rerum ad eaque, voluptatem porro? In modi debitis amet reprehenderit magni, blanditiis nulla illum pariatur nobis dolorem tenetur libero nisi non iusto cupiditate obcaecati, nihil provident quia eligendi. Dolorum, nihil itaque tenetur esse labore dolores ab commodi, temporibus ullam minima illum nesciunt illo animi perferendis obcaecati. Fuga ab ad veritatis officia eligendi, explicabo eum dolores sunt eaque dignissimos adipisci necessitatibus ipsa beatae ratione aut! Totam porro esse facere fuga sed similique optio eum corrupti corporis sequi velit soluta, tempora nulla? Ut rerum, provident atque, aperiam temporibus dolore deserunt veritatis, saepe ab consectetur quia eligendi eaque reprehenderit laboriosam quibusdam recusandae soluta dignissimos labore odio. Eius in voluptate error quod assumenda reprehenderit, beatae quis adipisci earum aperiam iusto dolorum sunt, et vitae perspiciatis labore magni a ex odit magnam deserunt qui quas aliquid praesentium. Quo qui eligendi tenetur reiciendis tempora, esse delectus alias debitis quam facilis tempore aspernatur, ipsam, eveniet eaque ipsa iusto voluptate hic eum. Consequatur temporibus similique assumenda eum maiores distinctio sint, odit dolore? Placeat porro ex at, vel expedita necessitatibus eaque aliquid animi nihil suscipit nemo totam minima fuga possimus deserunt laborum rem explicabo aperiam. Adipisci obcaecati repellat amet quo, deleniti non et quisquam! Corrupti perspiciatis, illo quam eveniet odit eos, deleniti omnis pariatur accusamus aperiam provident voluptas, vel incidunt modi tempora enim. Autem, esse a. Harum neque blanditiis commodi similique eaque officia accusantium debitis quibusdam reprehenderit, ab at temporibus error cumque, ex laborum possimus nostrum quod. Esse blanditiis, illo voluptas voluptatibus corporis deserunt aliquam ipsam reiciendis maiores optio inventore fugiat magnam minima accusamus error nulla dolorem magni. In est, voluptatem beatae, minima quaerat vel consequuntur tempore asperiores, ducimus rem pariatur? Quaerat molestiae vel blanditiis quo molestias sunt voluptate nihil, odit incidunt explicabo deleniti consectetur sequi vitae porro, quas voluptates iste quam corrupti animi. Necessitatibus at ipsa, nostrum nisi nobis libero sequi laudantium? Temporibus eos amet recusandae ut sapiente aliquid ex magni unde dignissimos at modi minus distinctio assumenda obcaecati illum, animi optio eligendi. Assumenda autem, unde id perferendis nemo accusamus ratione provident impedit vel eos numquam aliquam laborum hic placeat quisquam corporis possimus dolor eligendi rem exercitationem aspernatur libero quasi iusto vero. Et perspiciatis ex ad, temporibus vitae, modi labore exercitationem quasi asperiores, explicabo alias debitis? Omnis est iste non illo sapiente itaque aspernatur autem ullam architecto tempore nisi rem eligendi perspiciatis obcaecati eos porro corporis quod voluptate molestiae, quidem dolorum? Eveniet deleniti, repellat deserunt ab error libero consequatur ullam consequuntur iste voluptate ad fugiat labore voluptatem nobis est modi tempora expedita inventore porro laboriosam voluptatum tempore quos in non! Sunt vitae sed excepturi voluptates adipisci voluptatum similique earum aliquam modi provident? Enim alias rem debitis nisi quas, officia odit, reiciendis explicabo minima necessitatibus architecto reprehenderit a quidem ducimus eos. Sit, autem laudantium. Nam eum, tempora dolorum repellendus, blanditiis ratione optio dolor sequi, id quisquam assumenda eaque explicabo voluptas beatae.
          </v-card>
        </v-window-item>
        <v-window-item>
          <v-card color="blue">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas accusantium, assumenda quae dignissimos dolor totam rerum repudiandae sunt ducimus alias. Accusamus labore quisquam ipsa atque non libero consequatur perferendis! Explicabo unde, reprehenderit obcaecati porro facere libero cum cumque consectetur dolore. Illo voluptates minus perspiciatis, amet ad voluptatibus laudantium architecto facilis natus dolorum, sunt temporibus error iusto aliquam similique doloribus impedit dolorem et ex culpa pariatur ipsa necessitatibus nemo sapiente! Eum, ratione hic quasi ipsam molestias quis, libero magnam velit vel, dolore cum repellat. Dolorum a dicta laborum in fugit, incidunt tempora, praesentium ullam est nobis vitae sapiente perspiciatis aliquam dolore!
          </v-card>
        </v-window-item>
        <v-window-item>
          <v-card color="red">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas accusantium, assumenda quae dignissimos dolor totam rerum repudiandae sunt ducimus alias. Accusamus labore quisquam ipsa atque non libero consequatur perferendis! Explicabo unde, reprehenderit obcaecati porro facere libero cum cumque consectetur dolore. Illo voluptates minus perspiciatis, amet ad voluptatibus laudantium architecto facilis natus dolorum, sunt temporibus error iusto aliquam similique doloribus impedit dolorem et ex culpa pariatur ipsa necessitatibus nemo sapiente! Eum, ratione hic quasi ipsam molestias quis, libero magnam velit vel, dolore cum repellat. Dolorum a dicta laborum in fugit, incidunt tempora, praesentium ullam est nobis vitae sapiente perspiciatis aliquam dolore!
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi reiciendis quas eaque! Eveniet, minima ducimus incidunt ipsam eaque odio, ipsum est deleniti dolor libero possimus voluptatem. Animi maiores beatae ex. Commodi sed repellat iusto. Sint corporis repudiandae amet recusandae quis, harum corrupti, dolor error dicta labore facere adipisci blanditiis hic molestiae quos itaque id aliquid ab excepturi nemo accusantium atque at fuga ipsam. Blanditiis quia repellat in tempora fuga quod, quos amet ratione, aperiam nam doloribus eos quasi deleniti, animi laborum possimus facere? Totam laborum doloribus fuga pariatur. Modi hic tempora, deserunt nemo omnis reprehenderit facere animi eligendi necessitatibus id consequatur vel! Soluta provident fuga enim totam nostrum, sed illo ipsa quam ullam? Quod dolorem vitae quo voluptates deleniti facilis suscipit asperiores doloremque voluptatem enim. Fugiat, ex libero? Corporis a tempore, expedita illum, repudiandae explicabo similique sunt eos doloremque eum dolore mollitia non? Libero quam nulla nam tempore assumenda pariatur aliquid corporis sequi architecto iste debitis quos ut possimus, similique perspiciatis iusto impedit cum fugit iure expedita? Nobis tenetur doloribus sit maiores aperiam? Quae, perferendis quod. Dicta molestiae eligendi laboriosam quae? Nesciunt in inventore sit cupiditate eveniet veniam porro odio? Dolor perferendis velit odio similique perspiciatis accusantium ipsum, quae omnis. Placeat nihil fugit rem nostrum quos. Perspiciatis possimus cupiditate velit illo expedita, maxime rerum officiis labore minima fugiat nemo voluptates veritatis quisquam consequatur sint ipsum, quo, cumque iusto esse obcaecati accusamus quibusdam deserunt neque nihil. Deserunt maiores architecto similique, explicabo, distinctio accusantium repudiandae ad officiis laborum delectus veniam amet alias enim ullam vitae illo quisquam? Iure esse natus dolore velit laboriosam ex! Commodi reprehenderit accusamus incidunt sunt excepturi inventore sed cupiditate at odio ex suscipit obcaecati velit sequi quibusdam, explicabo itaque ullam temporibus porro nemo, harum deserunt iusto quia earum aperiam. Repudiandae explicabo adipisci corporis pariatur! Nihil, sequi dolores labore eaque necessitatibus aspernatur accusamus saepe rerum nulla quas deleniti enim ipsum iure facere minus! Dolores ex hic facere veritatis sint. Asperiores vero dolorum alias quod, aliquam distinctio consequatur tempora necessitatibus dolores, fugit, porro quaerat? Pariatur nostrum doloremque ipsum earum quod nesciunt quae consequuntur dolorem? Soluta ducimus itaque nihil, quae aliquam harum porro? Accusantium at totam quas impedit quos natus. Ex atque quis veniam maiores aut libero est doloribus repellendus quasi incidunt nulla quibusdam voluptatibus animi, enim sapiente velit dolor, ad facere, asperiores corrupti praesentium. Magnam, hic sit! Eos officia nobis expedita provident fugiat laudantium? Ab quis voluptatem modi, porro amet debitis minus recusandae iure ratione, nemo quam. Quisquam aliquam rerum, earum aut excepturi id, officia tempore minus ad commodi iure rem saepe sunt voluptas quod? Laudantium consectetur blanditiis provident error modi ullam non inventore repudiandae fugit esse ea nam laborum voluptatum, nihil eius a fuga aliquid eveniet omnis neque totam labore aut. Dolorum, minima ad dolores, mollitia expedita est adipisci assumenda quidem corporis dolore ipsum perferendis similique tempore reprehenderit molestiae dolor! Magnam ipsam ipsa quod modi dicta, reprehenderit fuga adipisci ad eligendi unde eaque omnis a nisi et qui quidem delectus! Voluptas ducimus hic vitae inventore libero aliquam totam accusantium molestiae aspernatur explicabo odio veniam tempora illum quibusdam dolores saepe ratione, ea labore odit officiis enim, eius suscipit reprehenderit. Expedita quibusdam consequuntur labore aliquid cum consectetur, tempora quae rerum ad eaque, voluptatem porro? In modi debitis amet reprehenderit magni, blanditiis nulla illum pariatur nobis dolorem tenetur libero nisi non iusto cupiditate obcaecati, nihil provident quia eligendi. Dolorum, nihil itaque tenetur esse labore dolores ab commodi, temporibus ullam minima illum nesciunt illo animi perferendis obcaecati. Fuga ab ad veritatis officia eligendi, explicabo eum dolores sunt eaque dignissimos adipisci necessitatibus ipsa beatae ratione aut! Totam porro esse facere fuga sed similique optio eum corrupti corporis sequi velit soluta, tempora nulla? Ut rerum, provident atque, aperiam temporibus dolore deserunt veritatis, saepe ab consectetur quia eligendi eaque reprehenderit laboriosam quibusdam recusandae soluta dignissimos labore odio. Eius in voluptate error quod assumenda reprehenderit, beatae quis adipisci earum aperiam iusto dolorum sunt, et vitae perspiciatis labore magni a ex odit magnam deserunt qui quas aliquid praesentium. Quo qui eligendi tenetur reiciendis tempora, esse delectus alias debitis quam facilis tempore aspernatur, ipsam, eveniet eaque ipsa iusto voluptate hic eum. Consequatur temporibus similique assumenda eum maiores distinctio sint, odit dolore? Placeat porro ex at, vel expedita necessitatibus eaque aliquid animi nihil suscipit nemo totam minima fuga possimus deserunt laborum rem explicabo aperiam. Adipisci obcaecati repellat amet quo, deleniti non et quisquam! Corrupti perspiciatis, illo quam eveniet odit eos, deleniti omnis pariatur accusamus aperiam provident voluptas, vel incidunt modi tempora enim. Autem, esse a. Harum neque blanditiis commodi similique eaque officia accusantium debitis quibusdam reprehenderit, ab at temporibus error cumque, ex laborum possimus nostrum quod. Esse blanditiis, illo voluptas voluptatibus corporis deserunt aliquam ipsam reiciendis maiores optio inventore fugiat magnam minima accusamus error nulla dolorem magni. In est, voluptatem beatae, minima quaerat vel consequuntur tempore asperiores, ducimus rem pariatur? Quaerat molestiae vel blanditiis quo molestias sunt voluptate nihil, odit incidunt explicabo deleniti consectetur sequi vitae porro, quas voluptates iste quam corrupti animi. Necessitatibus at ipsa, nostrum nisi nobis libero sequi laudantium? Temporibus eos amet recusandae ut sapiente aliquid ex magni unde dignissimos at modi minus distinctio assumenda obcaecati illum, animi optio eligendi. Assumenda autem, unde id perferendis nemo accusamus ratione provident impedit vel eos numquam aliquam laborum hic placeat quisquam corporis possimus dolor eligendi rem exercitationem aspernatur libero quasi iusto vero. Et perspiciatis ex ad, temporibus vitae, modi labore exercitationem quasi asperiores, explicabo alias debitis? Omnis est iste non illo sapiente itaque aspernatur autem ullam architecto tempore nisi rem eligendi perspiciatis obcaecati eos porro corporis quod voluptate molestiae, quidem dolorum? Eveniet deleniti, repellat deserunt ab error libero consequatur ullam consequuntur iste voluptate ad fugiat labore voluptatem nobis est modi tempora expedita inventore porro laboriosam voluptatum tempore quos in non! Sunt vitae sed excepturi voluptates adipisci voluptatum similique earum aliquam modi provident? Enim alias rem debitis nisi quas, officia odit, reiciendis explicabo minima necessitatibus architecto reprehenderit a quidem ducimus eos. Sit, autem laudantium. Nam eum, tempora dolorum repellendus, blanditiis ratione optio dolor sequi, id quisquam assumenda eaque explicabo voluptas beatae.
          </v-card>
        </v-window-item>
      </v-window>
    </div>
    <div class="d-lg-none d-xl-none"><h1>Small</h1></div>
    <div>
<!--      <preLoader/>-->
    </div>
  </div>
</template>

<script>
import LeftBar from '@/pages/views/Large/user/LeftBar'
import ContentArea from '@/pages/views/Large/user/ContentArea'
import RightBar from '@/pages/views/Large/user/RightBar'

export default {
  name: 'MainPage',
  components: {
    LeftBar,
    ContentArea,
    RightBar
  },
  data: function () {
    return {
      routes: ''
    }
  },
  created () {
  },
  computed: {
    win: {
      get: function () {
        this.routing()
        const mainPageMode = this.$store.getters.mainPageMode
        let win = ''
        switch (mainPageMode) {
          case 'MainPagePreloader':
            win = 0
            break
          case 'mainLCR':
            win = 1
            break
          case 'mainLC':
            win = 2
            break
          case 'mainCR':
            win = 3
            break
          case 'mainC':
            win = 4
            break
          default:
            win = 0
        }
        return win
      },
      set: function (v) {
      }
    }
  },
  methods: {
    routing () {
      let mainPageMode = 'mainLCR'
      let pageMode = 'user'
      switch (this.$route.name) {
        case 'user':
          mainPageMode = 'mainC'
          pageMode = 'user'
          break
        case 'targets':
          mainPageMode = 'mainLCR'
          pageMode = 'targets'
          break
        case 'accounts':
          mainPageMode = 'mainLCR'
          pageMode = 'accounts'
          break
        case 'operations':
          mainPageMode = 'mainLCR'
          pageMode = 'operations'
          break
        case 'statistic':
          mainPageMode = 'mainLCR'
          pageMode = 'statistic'
          break
        case 'properties':
          mainPageMode = 'mainLCR'
          pageMode = 'properties'
          break
        default:
          mainPageMode = 'C'
          pageMode = 'user'
      }
      this.$store.dispatch('chgMainPageMode', mainPageMode)
      this.$store.dispatch('chgPageMode', pageMode)
      // this.$store.dispatch('chgModes', this.$route.name)
    }
  }
}
</script>

<style scoped>
.v-window__container{
  background: red;
}
</style>
