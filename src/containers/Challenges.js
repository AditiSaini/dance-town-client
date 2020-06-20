import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import { onError } from "../libs/errorLib";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Challenges.css";

export default function Notes() {
    const file = useRef(null);
    const { id } = useParams();
    const history = useHistory();
    const [challenge, setNote] = useState(null);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        function loadNote() {
            return API.get("notes", `/notes/${id}`);
        }

        async function onLoad() {
            try {
                const challenge = await loadNote();
                const { content, attachment } = challenge;

                if (attachment) {
                    challenge.attachmentURL = await Storage.vault.get(attachment);
                }

                setContent(content);
                setNote(challenge);
            } catch (e) {
                onError(e);
            }
        }

        onLoad();
    }, [id]);

    function validateForm() {
        return content.length > 0;
    }

    function formatFilename(str) {
        return str.replace(/^\w+-/, "");
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    function saveNote(challenge) {
        return API.put("notes", `/notes/${id}`, {
            body: challenge
        });
    }

    async function handleSubmit(event) {
        let attachment;

        event.preventDefault();

        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${
                config.MAX_ATTACHMENT_SIZE / 1000000
                } MB.`
            );
            return;
        }

        setIsLoading(true);

        try {
            if (file.current) {
                attachment = await s3Upload(file.current);
            }

            await saveNote({
                content,
                attachment: attachment || challenge.attachment
            });
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function deleteNote() {
        return API.del("notes", `/notes/${id}`);
    }

    async function handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this challenge?"
        );

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);

        try {
            await deleteNote();
            history.push("/");
        } catch (e) {
            onError(e);
            setIsDeleting(false);
        }
    }

    return (
        <div className="Challenges">
            {challenge && (
                <form onSubmit={handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl
                            value={content}
                            componentClass="textarea"
                            onChange={e => setContent(e.target.value)}
                        />
                    </FormGroup>
                    {challenge.attachment && (
                        <FormGroup>
                            <ControlLabel>Attachment</ControlLabel>
                            <FormControl.Static>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={challenge.attachmentURL}
                                >
                                    {formatFilename(challenge.attachment)}
                                </a>
                            </FormControl.Static>
                        </FormGroup>
                    )}
                    {challenge.attachment && (
                        <video width="320" height="240" controls>
                            <source src={challenge.attachmentURL} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                    <FormGroup controlId="file">
                        {!challenge.attachment && <ControlLabel>Attachment</ControlLabel>}
                        <FormControl onChange={handleFileChange} type="file" />
                    </FormGroup>
                    <LoaderButton
                        block
                        type="submit"
                        bsSize="large"
                        bsStyle="primary"
                        isLoading={isLoading}
                        disabled={!validateForm()}
                    >
                        Save
          </LoaderButton>
                    <LoaderButton
                        block
                        bsSize="large"
                        bsStyle="danger"
                        onClick={handleDelete}
                        isLoading={isDeleting}
                    >
                        Delete
          </LoaderButton>
                </form>
            )}
        </div>
    );
}