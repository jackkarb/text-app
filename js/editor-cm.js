var EditSession = CodeMirror.Doc;

/**
 * @constructor
 * @param {DOM} elementId
 * @param {Settings} settings
 */
function EditorCodeMirror(editorElement, settings) {
  this.element_ = editorElement;
  this.settings_ = settings;
  this.cm_ = CodeMirror(editorElement, {'autofocus': true, 'value': ''});
  this.cm_.setSize(null, 'auto');
  this.cm_.on('change', this.onChange.bind(this));
  this.searchCursor_ = null;
  this.setTheme();
}

/**
 * @param {string} opt_content
 * @return {EditSession}
 * Create an edit session for a new file. Each tab should have its own session.
 */
EditorCodeMirror.prototype.newSession = function(opt_content) {
  var session = new CodeMirror.Doc(opt_content || '');
  return session;
};
/**
 * @param {EditSession} session
 * Change the current session, usually to switch to another tab.
 */
EditorCodeMirror.prototype.setSession = function(session) {
  this.cm_.swapDoc(session);
};

EditorCodeMirror.prototype.find = function(string) {
  this.searchCursor_ = this.cm_.getSearchCursor(string, this.cm_.getCursor());
  this.findNext();
};

EditorCodeMirror.prototype.findNext = function() {
  if (this.searchCursor_ && this.searchCursor_.findNext()) {
    var from = this.searchCursor_.from();
    var to = this.searchCursor_.to();
    console.log(from, to);
    this.cm_.setSelection(to, from);
  }
};

EditorCodeMirror.prototype.clearSearch = function() {
  this.searchCursor_ = null;
};

EditorCodeMirror.prototype.onChange = function() {
  $.event.trigger('docchange', this.cm_.getDoc());
};

EditorCodeMirror.prototype.undo = function() {
  this.cm_.undo();
};

EditorCodeMirror.prototype.redo = function() {
  this.cm_.redo();
};

EditorCodeMirror.prototype.focus = function() {
  this.cm_.focus();
};

/**
 * @param {Session} session
 * @param {string} extension
 */
EditorCodeMirror.prototype.setMode = function(session, extension) {
};

/**
 * @param {number} fontSize
 * Update font size from settings.
 */
EditorCodeMirror.prototype.setFontSize = function(fontSize) {
  $('.CodeMirror').css('font-size',fontSize + 'px');
  this.cm_.refresh();
};

/**
 * @param {EditSession} session
 * @return {string}
 */
EditorCodeMirror.prototype.getContents = function(session) {
  session.getValue();
};

/**
 * @param {EditSession} session
 * @param {number} size
 */
EditorCodeMirror.prototype.setTabSize = function(session, size) {
  this.cm_.setOption('tabSize', size);
};

/**
 * @param {string} theme
 */
EditorCodeMirror.prototype.setTheme = function(theme) {
  this.cm_.setOption('theme', theme || 'default');
};

/**
 * @param {boolean} val
 */
EditorCodeMirror.prototype.showHideLineNumbers = function(val) {
  this.cm_.setOption('lineNumbers', val);
};

/**
 * @param {boolean} val
 */
EditorCodeMirror.prototype.setWrapLines = function(val) {
  this.cm_.setOption('lineWrapping', val);
};

/**
 * @param {boolean} show
 * @param {number} col
 */
EditorCodeMirror.prototype.showHideMargin = function(show, col) {
};

var Editor = EditorCodeMirror;
