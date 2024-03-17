import React, { useState } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  CircularProgress,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Input from "@mui/material/Input";
import "./Translator.scss";
import { Link } from "react-router-dom";
import Header from "../../pages/Header";

const InputFile = styled("input")({
  display: "none",
});

const Translator = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputType, setInputType] = useState("");
  const [languagePair, setLanguagePair] = useState("en2vi");
  const [isUpload, setIsUpload] = useState(false);
  const [errorLimited, setErrorLimited] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");

  const translateText = () => {
    setIsLoading(true);
      axios
        .post(
          `http://localhost:5000/translate`, { text: text }
        )
        .then((response) => {
          setTranslatedText(response.data[0]);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setErrorLimited("");
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = function (e: any) {
        const textFile = e.target.result;
        console.log(textFile);
        if (textFile.length > 500) {
          setErrorLimited("Nội dung vượt quá 500 kí tự");
          setUploadedFileName("");
        } else {
          setText(textFile);
          setIsUpload(true);
        }
        setIsUpload(true);
      };
      reader.onerror = function (error) {
        console.error("Error reading file:", error);
        setIsUpload(false);
        setUploadedFileName("");
      };
      reader.readAsText(file);
    }
  };

  const speak = (text: string, lang = "en-US") => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = lang;
    window.speechSynthesis.speak(speech);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="background">
      <Header />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper className="translate-block" elevation={3} sx={{ p: 4 }}>
          <div style={{ textAlign: "center", fontSize: 16, fontWeight: 700 }}>
            QUICK TRANSLATION
          </div>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="language-pair-label">Language Pair</InputLabel>
            <Select
              labelId="language-pair-label"
              id="language-pair"
              value={languagePair}
              label="Language Pair"
              onChange={(e) => {
                setLanguagePair(e.target.value);
                setText("");
                setTranslatedText("");
                setIsUpload(false);
                setErrorLimited("");
                setUploadedFileName("");
              }}
            >
              <MenuItem value="en2vi">English to Vietnamese</MenuItem>
              <MenuItem value="vi2en">Vietnamese to English</MenuItem>
            </Select>
            <FormHelperText>
              Select language pair for translation
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel id="input-type-select-label">Input Type</InputLabel>
            <Select
              labelId="input-type-select-label"
              id="input-type-select"
              value={inputType}
              label="Input Type"
              onChange={(e) => {
                setInputType(e.target.value);
                setText("");
                setTranslatedText("");
                setIsUpload(false);
                setErrorLimited("");
                setUploadedFileName("");
              }}
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="file">File (.txt)</MenuItem>
            </Select>
          </FormControl>
          {/* <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="input-type"
              name="inputType"
              value={inputType}
              onChange={(e) => {
                setInputType(e.target.value);
                setText("");
                setTranslatedText("");
                setIsUpload(false);
              }}
            >
              <FormControlLabel value="text" control={<Radio />} label="Text" />
              <FormControlLabel
                value="file"
                control={<Radio />}
                label="File (.txt)"
              />
            </RadioGroup>
          </FormControl> */}
          {inputType === "text" ? (
            <div>
              <TextField
                fullWidth
                label="Enter text here..."
                variant="outlined"
                multiline
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                margin="normal"
              />
              <Button onClick={() => speak(text, "en-US")}>Phát Âm</Button>
              <Button onClick={() => copyToClipboard(text)}>Sao Chép</Button>
            </div>
          ) : inputType === "file" ? (
            <div>
              {uploadedFileName ? (
                <div>{uploadedFileName}</div>
              ) : (
                <>
                  <label htmlFor="contained-button-file">
                    <InputFile
                      accept=".txt"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={handleFileChange}
                    />
                    <Button variant="outlined" component="span">
                      Upload file .txt
                    </Button>
                  </label>
                </>
              )}
              {errorLimited && (
                <div style={{ fontSize: 14, color: "red" }}>{errorLimited}</div>
              )}

              {!errorLimited && isUpload && (
                <>
                  <div
                    style={{
                      marginTop: 8,
                      fontWeight: 700,
                    }}
                  >
                    File Content:
                  </div>
                  <div
                    style={{
                      whiteSpace: "pre-wrap",
                      border: "1px solid #ccc",
                      padding: "10px",
                      maxHeight: 200,
                      overflow: "auto",
                      marginTop: "10px",
                    }}
                  >
                    {text}
                  </div>
                  <Button onClick={() => speak(text, "en-US")}>Phát Âm</Button>
                  <Button onClick={() => copyToClipboard(text)}>
                    Sao Chép
                  </Button>
                </>
              )}
            </div>
          ) : (
            <></>
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={translateText}
            sx={{ mt: 2 }}
            disabled={isLoading || !text || !languagePair}
          >
            Translate
          </Button>
          {isLoading ? (
            <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
          ) : (
            <Typography sx={{ mt: 2 }}>Translated Text:</Typography>
          )}
          {!isLoading && (
            <div>
              <Paper variant="outlined" sx={{ mt: 2, p: 2 }}>
                {translatedText}
              </Paper>
              <Button onClick={() => speak(translatedText, "en-US")}>
                Phát Âm
              </Button>
              <Button onClick={() => copyToClipboard(translatedText)}>
                Sao Chép
              </Button>
            </div>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default Translator;
