<template>
  <div class="form border">
    <div v-if="preview_url" class="preview">
      <button @click.prevent="preview_url = ''" v-if='!in_upload'>
        <fa icon="times" />
      </button>
      <img :src="preview_url" v-if="preview_url" alt="" />
    </div>
    <label for="file" v-if="!preview_url">
      <fa icon="camera" />
    </label>
    <input type="file" ref="file" id="file" @change="preview" />
    <button
      @click.prevent="upload"
      v-if="preview_url"
      class="Upload"
      :disabled="in_upload"
    >
      <span v-if="in_upload">Uploading...</span>
      <span v-else> Upload <fa icon="upload" /> </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "UploadForm",
  data: () => ({
    preview_url: "",
    in_upload: false,
  }),
  methods: {
    setCookie(name, value) {
      if (process.client) {
        document.cookie = name + "=" + value + ";path=/";
      }
    },
    getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(";");

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    },
    upload() {
      if (!this.in_upload) {
        this.in_upload = true;
        var formdata = new FormData();

        if (Array.from(this.$refs.file.files).length) {
          formdata.append(
            "file",
            this.$refs.file.files[0],
            this.$refs.file.files[0].filename
          );

          this.$axios
            .$post("https://damp-ridge-60110.herokuapp.com/api/img", formdata, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((img) => {
              if (process.client) {
                // get cookie
                if (this.getCookie("my_gifs")) {
                  let newData = Array.from(
                    JSON.parse(this.getCookie("my_gifs"))
                  );
                  newData.unshift(img);

                  this.setCookie("my_gifs", JSON.stringify(newData));
                } else {
                  this.setCookie("my_gifs", JSON.stringify([img]));
                }
              }
            })
            .finally(() => {
              this.preview_url = "";
              this.in_upload = false;

              this.$emit("update_list");
            });
        }
      }
    },
    preview() {
      if (process.client) {
        let file = this.$refs.file.files[0],
          fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.addEventListener("load", () => {
          this.preview_url = fileReader.result;
        });
      }
    },
  },
};
</script>

<style scoped>
[type="file"] {
  display: none;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  min-height: 300px;
}

.preview {
  width: 200px;
  height: 200px;
  position: relative;
}
.preview img {
  height: 100%;
  width: 100%;
  border-radius: 5px;
  object-fit: cover;
  box-shadow: -3px 0 15px #777, 3px 0 6px #777;
}

.preview button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  box-shadow: inset 0 0 7px #333;
  height: 30px;
  width: 30px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
.preview button:hover {
  box-shadow: inset 0 0 7px #f33;
  background: #f007;
  border: none;
}

.Upload:hover {
  filter: brightness(150%);
}
label,
.Upload {
  padding: 10px 20px;
  background: #d83c22;
  border: none;
  border-radius: 5px;
  color: #ededea;
}

[disabled] {
  background: #333;
  cursor: not-allowed;
}

svg {
  color: #ededea;
}
</style>
