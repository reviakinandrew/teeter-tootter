<template>
  <div class="top-panel p-relative d-flex ai-center jc-center p-15">
    <Button 
      class="bg-blue"
      @click.prevent="setPlayButton"
    >
      {{ getPlaying ? 'Stop' : 'Play' }}
    </Button>
    <Button 
      class="ml-15"
      @click.prevent="setPauseButton"
      :disabled="!getPlaying"
    >
      {{ getPaused ? 'Continue' : 'Pause' }}
    </Button>
  </div>
</template>

<script>
import Button from '@/components/UI/Button.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { Button },
  computed: {
    ...mapGetters(['getPlaying', 'getPaused'])
  },
  methods: {
    ...mapActions(['setPlayButton', 'setPauseButton'])
  }
}
</script>
