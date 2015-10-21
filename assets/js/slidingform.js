var selector;
var selectorID;

activateTab('#myTab a:first');

function activateTab(selectorID) 
{
    $(selectorID).tab('show')
        .closest('.disabled').removeClass('disabled');    
}

function deactivateTab(selector) 
{
    $(selector).off('click.twbstab')
        .closest('li').addClass('disabled');
}

$('.btn-demo').on('click',function() {
    selector = '#myTab a[href="'+$(this).data('activate')+'"]';
    selectorID = $(selector).attr('href');
});

var val1 = $('#frmtype1').validate(
{
    errorPlacement: function(error, element) {}, 
    // prevent the standard error message from showing, rather you use the inline-text
    rules: {
        'Reg_type': {
            required: true
        }
    }
});

// validate 1st form
$('#frmtype1').submit(function(e) 
{
    // validate the first page
    if(val1.form()) {
        $('.help-inline').hide();
        activateTab(selector);
    } else {
        $('.help-inline').show();
    }
    return false;
});

// validate 2nd form
$('#frmtype2').submit(function(e) 
{
    // validate the second page
    activateTab(selector);
    return false;
});


// if 2nd or 3rd tab is clicked, validate as if the form was submitted
$('#myTab li:eq(1) a, #myTab li:eq(2) a').click(function(e) 
{
    selectorID = $(this).attr('href');
    // validate the first page
    if(val1.form()) {
        $('.help-inline').hide();
        activateTab(this);
        $(selectorID).tab('show');
    } else {
        $('.help-inline').show();
    }
    return false;
});

// re-position all tab-panes, except the active pane, so that they are prepared for the slide effect
$(".tab-pane").css("position", "relative");
$(".tab-pane").not(".active").animate({
    left: "1000px"
});

// perform slide effect
$('a[data-toggle="tab"]').on('show', function (e) {
    lastPane = $(e.relatedTarget).attr('href');
    $(lastPane).animate({left: "1000px"}, 300)
    currPane = $(e.target).attr('href');
    $(currPane).animate({left: "0px"}, 300);
});    