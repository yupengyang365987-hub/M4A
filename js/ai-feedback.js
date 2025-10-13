// AI Feedback Tool JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const submitBtn = document.getElementById('submitBtn');
    const scriptInput = document.getElementById('scriptInput');
    const scriptType = document.getElementById('scriptType');
    const resultsDiv = document.getElementById('feedbackResults');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const script = scriptInput.value.trim();
        const type = scriptType.value;

        if (!script) {
            alert('Please enter your script before submitting.');
            return;
        }

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span> Analyzing...';

        // Simulate AI processing (in a real app, this would call an API)
        setTimeout(() => {
            const feedback = generateFeedback(script, type);
            displayFeedback(feedback);
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Analyze Script';
            
            // Scroll to results
            resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 2000);
    });
});

function generateFeedback(script, type) {
    // This is a simulated AI feedback generator
    // In a real application, this would call an AI API
    
    const wordCount = script.split(/\s+/).length;
    const sentenceCount = script.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const avgSentenceLength = Math.round(wordCount / sentenceCount);
    
    const hasQuestions = script.includes('?');
    const hasEvidence = /exhibit|document|record|testimony/i.test(script);
    const hasLegalTerms = /objection|sustained|overruled|hearsay|relevance|foundation/i.test(script);
    
    let feedback = {
        overall: '',
        strengths: [],
        improvements: [],
        suggestions: []
    };

    // Overall assessment based on type
    if (type === 'opening') {
        feedback.overall = `Your opening statement is ${wordCount} words long. This is ${wordCount > 500 ? 'quite comprehensive' : wordCount > 300 ? 'a good length' : 'concise'}. The average sentence length is ${avgSentenceLength} words, which is ${avgSentenceLength > 20 ? 'on the longer side - consider breaking up complex sentences' : 'good for clarity'}.`;
        
        feedback.strengths.push('Clear structure with introduction and case overview');
        if (hasEvidence) feedback.strengths.push('Good reference to evidence and exhibits');
        feedback.strengths.push('Professional tone maintained throughout');
        
        feedback.improvements.push('Consider adding a stronger emotional hook in the opening');
        if (!hasEvidence) feedback.improvements.push('Include specific references to key evidence');
        feedback.improvements.push('Ensure you preview all major witnesses and evidence');
        
        feedback.suggestions.push('Start with a compelling story or image that frames your case');
        feedback.suggestions.push('Use a roadmap structure: "First... Second... Finally..."');
        feedback.suggestions.push('End with a clear theme that jurors can remember');
        
    } else if (type === 'closing') {
        feedback.overall = `Your closing argument is ${wordCount} words. The average sentence length is ${avgSentenceLength} words. Closings should be persuasive and connect all the evidence to your theory of the case.`;
        
        feedback.strengths.push('Strong conviction and persuasive tone');
        if (hasEvidence) feedback.strengths.push('Effective use of evidence citations');
        feedback.strengths.push('Clear argument structure');
        
        feedback.improvements.push('Address potential weaknesses in your case more directly');
        feedback.improvements.push('Incorporate more emotional appeal to complement logic');
        feedback.improvements.push('Consider using rhetorical devices for emphasis');
        
        feedback.suggestions.push('Review each piece of evidence and explain what it proves');
        feedback.suggestions.push('Anticipate and refute opposing arguments');
        feedback.suggestions.push('End with a powerful call to action for the jury');
        
    } else if (type === 'direct') {
        feedback.overall = `Your direct examination contains ${sentenceCount} question-answer pairs. Direct examinations should use open-ended questions that allow witnesses to tell their story naturally.`;
        
        if (hasQuestions) feedback.strengths.push('Good use of questioning format');
        feedback.strengths.push('Logical progression of topics');
        feedback.strengths.push('Allows witness to provide detailed answers');
        
        feedback.improvements.push('Avoid leading questions on direct examination');
        feedback.improvements.push('Use more open-ended questions (Who, What, Where, When, Why, How)');
        feedback.improvements.push('Ensure smooth transitions between topics');
        
        feedback.suggestions.push('Start with background questions to establish credibility');
        feedback.suggestions.push('Build chronologically or thematically');
        feedback.suggestions.push('End with your strongest, most important points');
        
    } else if (type === 'cross') {
        feedback.overall = `Your cross examination contains ${sentenceCount} exchanges. Cross should be controlled, focused, and built on leading questions that advance your theory.`;
        
        feedback.strengths.push('Clear objectives for the cross examination');
        if (hasQuestions) feedback.strengths.push('Good use of question format');
        feedback.strengths.push('Maintains control of the witness');
        
        feedback.improvements.push('Use shorter, more leading questions');
        feedback.improvements.push('Avoid asking "why" questions that give witness control');
        feedback.improvements.push('Build to your impeachment systematically');
        
        feedback.suggestions.push('One fact per question - keep questions short and simple');
        feedback.suggestions.push('Use the "statement + tag" format: "You were there, weren\'t you?"');
        feedback.suggestions.push('Know when to sit down - make your points and move on');
        
    } else if (type === 'witness') {
        feedback.overall = `Your witness statement is ${wordCount} words. It provides ${sentenceCount} distinct points or responses. Witness statements should be credible, consistent, and support your case theory.`;
        
        feedback.strengths.push('Natural, conversational tone');
        feedback.strengths.push('Consistent character voice');
        feedback.strengths.push('Clear and direct responses');
        
        feedback.improvements.push('Ensure all facts align with case materials');
        feedback.improvements.push('Prepare for likely cross-examination attacks');
        feedback.improvements.push('Balance detail with conciseness');
        
        feedback.suggestions.push('Know your character\'s motivations and background thoroughly');
        feedback.suggestions.push('Practice staying in character under pressure');
        feedback.suggestions.push('Prepare strong explanations for any inconsistencies');
    }

    // Add general feedback based on script characteristics
    if (wordCount < 100) {
        feedback.improvements.push('Consider expanding your script with more detail and examples');
    }
    
    if (avgSentenceLength > 25) {
        feedback.improvements.push('Some sentences are quite long - break them up for better clarity');
    }
    
    if (!hasLegalTerms && (type === 'opening' || type === 'closing')) {
        feedback.suggestions.push('Consider incorporating more legal terminology where appropriate');
    }

    return feedback;
}

function displayFeedback(feedback) {
    const resultsDiv = document.getElementById('feedbackResults');
    const overallDiv = document.getElementById('overallFeedback');
    const strengthsList = document.getElementById('strengthsList');
    const improvementsList = document.getElementById('improvementsList');
    const suggestionsList = document.getElementById('suggestionsList');

    // Display overall assessment
    overallDiv.innerHTML = `<p style="color: var(--text-secondary); line-height: 1.8;">${feedback.overall}</p>`;

    // Display strengths
    strengthsList.innerHTML = feedback.strengths.map(item => 
        `<li style="color: var(--success-color); margin-bottom: 0.75rem;">✓ ${item}</li>`
    ).join('');

    // Display improvements
    improvementsList.innerHTML = feedback.improvements.map(item => 
        `<li style="color: var(--warning-color); margin-bottom: 0.75rem;">→ ${item}</li>`
    ).join('');

    // Display suggestions
    suggestionsList.innerHTML = feedback.suggestions.map(item => 
        `<li style="color: var(--primary-color); margin-bottom: 0.75rem;">💡 ${item}</li>`
    ).join('');

    // Show results
    resultsDiv.style.display = 'block';
}
