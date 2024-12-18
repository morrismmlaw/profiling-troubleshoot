<template>
    <div class="card ms-md-0 ms-2 shadow rounded-5 border-0">
        <div class="card-body">
            <section>
                <o-field class="col-form-tag" label="DEPARTMENT">
                    <o-taginput v-model="DEPTags" :options="DEPOptionsOrugaNew" :allow-new="allowNew"
                        :allow-duplicates="false" :open-on-focus="openOnFocus" :keep-open="false"
                        :keep-first="keepFirst" icon="tag" placeholder="Select options" expanded />
                </o-field>
            </section>
            <div class="row mb-3 rounded-5 border-4">
                <div class="row">
                    <label for="biography" class="col col-form-label">Biography</label>
                </div>
                <div class="row">
                    <div class="col">
                        <tiptap-editor :formData="formData" field="biography" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-sm-12 col-md-12">
                    <h6 class="col-form-label">Sustainable Development Goals (SDGs)</h6>
                </div>
                <div class="col-11 col-sm-11 col-md-12">
                    <div class="columns is-multiline">
                        <div class="column is-one-fifth" v-for="sdg in sdgOptions" :key="sdg">
                            <o-field class="sdg-field">
                                <o-tooltip label="HTML Content" size="large" variant="info" multiline>
                                    <template #content>
                                        <div class="sdg-info">
                                            <p><strong>Title</strong> <br> {{ sdg.title }}</p>
                                            <p><strong>Description</strong> <br> {{ sdg.slogan }}</p>
                                        </div>
                                    </template>
                                    <o-checkbox v-model="checkboxGroup" :native-value="`${sdg.sdgid}`"
                                        :label="sdg.sdgid">
                                        <p class="col-form-label-sdg"> SDG {{ sdg.sdgid }} </p>
                                        <nuxt-img
                                            :src="`https://edu.unicef.org.hk/image/catalog/teaching%20resource/goal${sdg.sdgid}a.png`"
                                            :alt="sdg.title" class="img-fluid checkbox-img" />
                                    </o-checkbox>
                                </o-tooltip>
                            </o-field>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style></style>