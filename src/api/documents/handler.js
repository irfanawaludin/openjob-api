class DocumentsHandler {

  constructor(service) {

    this._service = service;

    this.postDocumentHandler =
      this.postDocumentHandler.bind(this);

    this.getDocumentsHandler =
      this.getDocumentsHandler.bind(this);

    this.getDocumentByIdHandler =
      this.getDocumentByIdHandler.bind(this);

    this.deleteDocumentByIdHandler =
      this.deleteDocumentByIdHandler.bind(this);
  }

  async postDocumentHandler(
    req,
    res
  ) {

    const user_id =
      req.auth.id;

    const filename =
      req.file.filename;

    const title =
      req.file.originalname;

    const documentId =
      await this._service.addDocument({
        user_id,
        title,
        filename,
      });

    return res.status(201).json({
      status: 'success',
      message: 'Document berhasil upload',
      data: {
        documentId,
      },
    });
  }

  async getDocumentsHandler(
    req,
    res
  ) {

    const documents =
      await this._service.getDocuments();

    return res.json({
      status: 'success',
      data: {
        documents,
      },
    });
  }

  async getDocumentByIdHandler(
    req,
    res
  ) {

    const { id } =
      req.params;

    const document =
      await this._service
        .getDocumentById(id);

    return res.json({
      status: 'success',
      data: {
        document,
      },
    });
  }

  async deleteDocumentByIdHandler(
    req,
    res
  ) {

    const { id } =
      req.params;

    await this._service
      .deleteDocumentById(id);

    return res.json({
      status: 'success',
      message: 'Document berhasil dihapus',
    });
  }
}

module.exports =
  DocumentsHandler;