import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import { MdCameraAlt } from 'react-icons/md';

import api from '~/services/api';

import { Container } from './styles';

export default function FileInput({ name, field }) {
  const { defaultValue, registerField } = useField(field);

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name,
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref.current]);// eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }
  return (
    <Container>
      <label htmlFor="banner">
        {preview ? (
          <img src={preview} alt="Banner" />
        ) : (
          <>
            <MdCameraAlt size={40} color="rgba(255,255,255,0.7)" />
            <h1>Selecionar Foto</h1>
          </>
        )}

        <input
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
};
