<template>
    <div class="upload-profile" :class="{ rounded: props.rounded, fit: props.fit }">
        <p v-if="showPreview">{{ props.label }} <span v-if="isRequired">*</span></p>

        <div style="display: flex; align-items: center; gap: 20px">
            <div
                v-if="showPreview"
                class="profile-preview"
                :style="{ width: `${width}px`, aspectRatio: aspectRadio }"
            >
                <el-skeleton style="width: 100%" v-if="!previewImg && !props.previewUrl">
                    <template #template>
                        <el-skeleton-item variant="image" style="width: 100%; height: 100%" />
                    </template>
                </el-skeleton>

                <el-image
                    :zoom-rate="1.2"
                    :initial-index="4"
                    fit="contain"
                    v-if="previewImg || props.previewUrl"
                    :src="previewImg || props.previewUrl"
                    :preview-src-list="[previewImg || props.previewUrl]"
                />
                <input
                    class="d-none"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    ref="fileInput"
                    @change="onInputFileChange"
                />
            </div>
            <div v-if="!props.readOnly && !props.disabled">
                <el-button type="primary" @click="triggerFileInput" :disabled="props.disabled"
                    >Upload Image</el-button
                >
                <div
                    style="
                        font-size: 12px;
                        line-height: 0;
                        padding-top: 10px;
                        color: #858585;
                        padding-top: 20px;
                    "
                >
                    *Upload file with exact {{ resolutionWidth + 'x' + resolutionHeight }}, less
                    than {{ maxSize }} {{ sizeUnit }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FileSizeUnit } from '@/common/enums/file-size.enum'
import messageBox from '@/utils/message-box.util'
import { ref } from 'vue'

const fileInput = ref<any>(null)
const selectedFile = ref()
const previewImg: any = ref(null)

const emits = defineEmits(['fileSelected'])
const props = defineProps({
    showPreview: {
        type: Boolean,
        default: true
    },
    label: {
        required: false,
        type: String,
        default: 'Upload Profile'
    },
    previewUrl: {
        required: false,
        type: String
    },
    width: {
        required: false,
        type: Number,
        default: 238
    },
    rounded: {
        required: false,
        type: Boolean,
        default: false
    },
    fit: {
        required: false,
        type: Boolean,
        default: false
    },
    maxSize: {
        required: false,
        type: Number,
        default: 1
    },
    sizeUnit: {
        required: false,
        type: String,
        default: FileSizeUnit.KB
    },
    aspectRadio: {
        required: false,
        type: String,
        default: '1/1'
    },
    readOnly: {
        required: false,
        type: Boolean,
        default: false
    },
    isRequired: {
        required: false,
        type: Boolean,
        default: false
    },
    resolutionHeight: {
        required: false,
        type: Number
    },
    resolutionWidth: {
        required: false,
        type: Number
    },
    disabled: {
        required: false,
        type: Boolean,
        default: false
    }
})

const previewFile = () => {
    if (!selectedFile.value) return
    previewImg.value = URL.createObjectURL(selectedFile.value)
}

const triggerFileInput = () => {
    if (props.readOnly) return
    fileInput.value.click()
}

const onInputFileChange = async (event: any) => {
    if (!event.target.files) return
    const file = event.target.files[0]

    const maxSizeInKb = props.sizeUnit === FileSizeUnit.MB ? props.maxSize * 1024 : props.maxSize
    if (file.size / 1000 > maxSizeInKb) {
        messageBox.error(`File size must be less than ${props.maxSize} ${props.sizeUnit}.`)
        return
    }

    const reader = new FileReader()

    reader.onload = (e) => {
        const img = new Image()
        img.src = e.target?.result as string

        img.onload = () => {
            // Validate the resolution
            if (props.resolutionHeight && props.resolutionWidth) {
                if (img.width !== props.resolutionWidth || img.height !== props.resolutionHeight) {
                    messageBox.error(
                        `Please upload an image with exact ${props.resolutionWidth}x${props.resolutionHeight} resolution.`
                    )
                } else {
                    // Set file only if it passes the checks
                    selectedFile.value = file
                    emits('fileSelected', selectedFile.value)
                    previewFile()
                }
            }
        }

        img.onerror = () => {
            messageBox.error('Error loading image.')
        }
    }

    reader.onerror = () => {
        messageBox.error('Failed to read the file.')
    }

    reader.readAsDataURL(file)

    // selectedFile.value = file
    // emits('fileSelected', selectedFile.value)
    // previewFile()
}

const clearSelectedFile = () => {
    previewImg.value = undefined
    selectedFile.value = undefined
}

defineExpose({
    clearSelectedFile
})
</script>
<style>
.upload-profile .profile-preview img {
    object-fit: contain;
}
</style>
